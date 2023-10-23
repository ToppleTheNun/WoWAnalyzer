import { formatPercentage, formatThousands } from 'common/format';
import SPELLS from 'common/SPELLS';
import TALENTS from 'common/TALENTS/warrior';
import { SpellLink } from 'interface';
import Analyzer, { Options, SELECTED_PLAYER } from 'parser/core/Analyzer';
import { calculateEffectiveDamage } from 'parser/core/EventCalculateLib';
import Events, { CastEvent, DamageEvent } from 'parser/core/Events';
import StatisticListBoxItem from 'parser/ui/StatisticListBoxItem';

/**
 * Whirlwind deals 10% increased damage, and Slams your primary target.
 *
 * Example log: /report/cM1Kmp3qW8Yvkang/1-LFR+Zul+-+Kill+(4:21)/22-Gorrtil/events
 */

const WHIRLWIND_DAMAGE_BONUS = 0.1;
const MAX_DELAY = 30;

class FervorOfBattle extends Analyzer {
  get dps() {
    return (this.bonusDamage / this.owner.fightDuration) * 1000;
  }

  bonusDamage = 0;
  lastWhirlwindCast = 0;
  whirlwind = 0;

  constructor(options: Options) {
    super(options);
    this.active = this.selectedCombatant.hasTalent(TALENTS.FERVOR_OF_BATTLE_TALENT);
    this.addEventListener(
      Events.cast.by(SELECTED_PLAYER).spell(SPELLS.WHIRLWIND),
      this._onWhirlwindCast,
    );
    this.addEventListener(
      Events.damage
        .by(SELECTED_PLAYER)
        .spell([SPELLS.WHIRLWIND_DAMAGE_1, SPELLS.WHIRLWIND_DAMAGE_2_3, SPELLS.SLAM]),
      this._onFobDamage,
    );
  }

  _onWhirlwindCast(event: CastEvent) {
    this.lastWhirlwindCast = event.timestamp;
  }

  _onFobDamage(event: DamageEvent) {
    const guid = event.ability.guid;
    if (guid === SPELLS.WHIRLWIND_DAMAGE_1.id || guid === SPELLS.WHIRLWIND_DAMAGE_2_3.id) {
      this.bonusDamage += calculateEffectiveDamage(event, WHIRLWIND_DAMAGE_BONUS);
    } else if (guid === SPELLS.SLAM.id && event.timestamp - this.lastWhirlwindCast < MAX_DELAY) {
      this.bonusDamage += event.amount + (event.absorbed || 0);
    }
  }

  subStatistic() {
    return (
      <StatisticListBoxItem
        title={
          <>
            <SpellLink spell={TALENTS.FERVOR_OF_BATTLE_TALENT} /> bonus damage
          </>
        }
        value={`${formatThousands(this.dps)} DPS`}
        valueTooltip={`Your Fervor of Battle contributed ${formatThousands(
          this.bonusDamage,
        )} total damage (${formatPercentage(
          this.owner.getPercentageOfTotalDamageDone(this.bonusDamage),
        )} %).`}
      />
    );
  }
}

export default FervorOfBattle;
