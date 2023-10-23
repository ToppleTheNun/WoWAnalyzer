import { defineMessage } from '@lingui/macro';
import { formatNumber } from 'common/format';
import SPELLS from 'common/SPELLS';
import TALENTS from 'common/TALENTS/priest';
import { SpellLink } from 'interface';
import Insanity from 'interface/icons/Insanity';
import Analyzer, { Options, SELECTED_PLAYER } from 'parser/core/Analyzer';
import Events, {
  CastEvent,
  DamageEvent,
  RemoveBuffEvent,
  ResourceChangeEvent,
} from 'parser/core/Events';
import { ThresholdStyle, When } from 'parser/core/ParseResults';
import BoringSpellValueText from 'parser/ui/BoringSpellValueText';
import ItemDamageDone from 'parser/ui/ItemDamageDone';
import Statistic from 'parser/ui/Statistic';
import STATISTIC_CATEGORY from 'parser/ui/STATISTIC_CATEGORY';
import GradiatedPerformanceBar from 'interface/guide/components/GradiatedPerformanceBar';
import { explanationAndDataSubsection } from 'interface/guide/components/ExplanationRow';

import { MS_BUFFER, VOID_TORRENT_MAX_INSANITY, VOID_TORRENT_MAX_TIME } from '../../constants';

function formatSeconds(seconds: number) {
  return Math.round(seconds * 10) / 10;
}

class VoidTorrent extends Analyzer {
  _previousVoidTorrentCast: any;
  damage = 0;
  totalChannelingTime = 0;
  totalWastedTime = 0;
  insanityGained = 0;
  insanityCurrent = 0;
  insanityWasted = 0;

  constructor(options: Options) {
    super(options);
    this.active = this.selectedCombatant.hasTalent(TALENTS.VOID_TORRENT_TALENT);
    this.addEventListener(
      Events.cast.by(SELECTED_PLAYER).spell(TALENTS.VOID_TORRENT_TALENT),
      this.onCast,
    );
    this.addEventListener(
      Events.removebuff.by(SELECTED_PLAYER).spell(TALENTS.VOID_TORRENT_TALENT),
      this.onBuffRemoved,
    );
    this.addEventListener(
      Events.damage.by(SELECTED_PLAYER).spell(TALENTS.VOID_TORRENT_TALENT),
      this.onDamage,
    );
    this.addEventListener(
      Events.resourcechange.by(SELECTED_PLAYER).spell(SPELLS.VOID_TORRENT_BUFF),
      this.onEnergize,
    );
  }

  _voidTorrents: any = {};

  get voidTorrents() {
    return Object.keys(this._voidTorrents).map((key) => this._voidTorrents[key]);
  }

  get timeWasted() {
    return this.voidTorrents.reduce((total, c) => total + c.wastedTime, 0) / 1000;
  }

  get timeWastedPercentage() {
    return this.timeWasted / this.totalChannelingTime;
  }

  get insanityWastedPercentage() {
    return this.insanityWasted / (this.insanityGained + this.insanityWasted);
  }

  get interruptThreshold() {
    return {
      actual: this.timeWastedPercentage,
      isGreaterThan: {
        minor: 0,
        average: 0.05,
        major: 0.1,
      },
      style: ThresholdStyle.PERCENTAGE,
    };
  }

  get wasteThreshold() {
    return {
      actual: this.insanityWastedPercentage,
      isGreaterThan: {
        minor: 0.05,
        average: 0.1,
        major: 0.15,
      },
      style: ThresholdStyle.PERCENTAGE,
    };
  }

  onCast(event: CastEvent | DamageEvent) {
    //console.log("cast", event.timestamp)
    this._voidTorrents[event.timestamp] = {
      start: event.timestamp,
    };
    this._previousVoidTorrentCast = event;
  }

  onBuffRemoved(event: RemoveBuffEvent) {
    //console.log("End", event.timestamp)
    const maybeWaste = VOID_TORRENT_MAX_INSANITY - this.insanityCurrent;

    //This is the insanity that could have been generated by this ability but wasn't.
    //this could be due to overcapping or canceling the channel early, but this isn't able to distinguish that.
    this.insanityWasted = this.insanityWasted + maybeWaste;

    const timeSpentChanneling = event.timestamp - this._previousVoidTorrentCast.timestamp;
    const wastedTime =
      VOID_TORRENT_MAX_TIME - MS_BUFFER > timeSpentChanneling
        ? VOID_TORRENT_MAX_TIME - timeSpentChanneling
        : 0;
    this.totalChannelingTime += VOID_TORRENT_MAX_TIME - wastedTime;

    this.totalWastedTime += wastedTime;

    this._voidTorrents[this._previousVoidTorrentCast.timestamp] = {
      ...this._voidTorrents[this._previousVoidTorrentCast.timestamp],
      wastedTime,
      end: event.timestamp,
    };

    this._previousVoidTorrentCast = null;

    this.insanityCurrent = 0;
  }

  onDamage(event: DamageEvent) {
    //console.log("Damage moment", event.timestamp)
    this.damage += event.amount + (event.absorbed || 0);
  }

  onEnergize(event: ResourceChangeEvent) {
    //console.log("Energize", event.timestamp);
    this.insanityCurrent = this.insanityCurrent + event.resourceChange;
    this.insanityGained += event.resourceChange;
  }

  suggestions(when: When) {
    when(this.interruptThreshold).addSuggestion((suggest, actual, recommended) =>
      suggest(
        <>
          You interrupted <SpellLink spell={TALENTS.VOID_TORRENT_TALENT} /> early, wasting{' '}
          {formatSeconds(this.timeWasted)} channeling seconds! Try to position yourself & time it so
          you don't get interrupted due to mechanics.
        </>,
      )
        .icon(TALENTS.VOID_TORRENT_TALENT.icon)
        .actual(
          defineMessage({
            id: 'priest.shadow.suggestions.voidTorrent.secondsLost',
            message: `Lost ${formatSeconds(this.timeWasted)} seconds of Void Torrent.`,
          }),
        )
        .recommended('No time wasted is recommended.'),
    );
  }

  statistic() {
    return (
      <Statistic
        category={STATISTIC_CATEGORY.TALENTS}
        size="flexible"
        tooltip={
          <>
            <div>
              {formatSeconds(this.timeWasted)} seconds wasted by cancelling the channel early.{' '}
            </div>
            <div>
              {formatNumber(this.insanityWasted)} insanity wasted by cancelling the channel early or
              overcapping.{' '}
            </div>
          </>
        }
      >
        <BoringSpellValueText spell={TALENTS.VOID_TORRENT_TALENT}>
          <>
            <ItemDamageDone amount={this.damage} /> <br />
            <Insanity /> {this.insanityGained} <small>Insanity generated</small>
          </>
        </BoringSpellValueText>
      </Statistic>
    );
  }

  get guideSubsection(): JSX.Element {
    const channelTime = {
      count: formatSeconds(this.totalChannelingTime / 1000),
      label: 'Cast Time',
    };

    const wastedTime = {
      count: formatSeconds(this.totalWastedTime / 1000),
      label: 'Canceled Time',
    };

    const insanityGained = {
      count: Math.round(this.insanityGained),
      label: 'Gained Insanity',
    };

    const insanityMissed = {
      //this is both overcapped and from missed time currently.
      count: Math.round(this.insanityWasted),
      label: 'Missed Insanity',
    };

    const explanation = (
      <p>
        <b>
          <SpellLink spell={TALENTS.VOID_TORRENT_TALENT} />
        </b>{' '}
        deals damage and generates 24 insanity over its 3 second channel.
        <br />
        You should cast this spell as often as you can, without overcapping insanity, whith{' '}
        <SpellLink spell={TALENTS.DEVOURING_PLAGUE_TALENT} /> on your target. When you use this
        spell, it should always be fully channeled.
      </p>
    );

    const data = (
      <div>
        <strong>Channel Time Lost</strong>
        <GradiatedPerformanceBar good={channelTime} bad={wastedTime} />
        <strong>Insanity Lost</strong>
        <GradiatedPerformanceBar good={insanityGained} bad={insanityMissed} />
      </div>
    );
    return explanationAndDataSubsection(explanation, data, 50);
  }
}

export default VoidTorrent;
