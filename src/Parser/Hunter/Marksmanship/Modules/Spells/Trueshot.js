import React from 'react';
import Analyzer from 'Parser/Core/Analyzer';
import HIT_TYPES from 'Parser/Core/HIT_TYPES';

import SPELLS from 'common/SPELLS/HUNTER';
import StatisticBox, { STATISTIC_ORDER } from 'Interface/Others/StatisticBox';
import SpellIcon from 'common/SpellIcon';
import { formatNumber, formatPercentage } from 'common/format';
import RESOURCE_TYPES from 'common/RESOURCE_TYPES';
import SpellUsable from 'Parser/Core/Modules/SpellUsable';
import ResourceIcon from 'common/ResourceIcon';
import Abilities from 'Parser/Core/Modules/Abilities';

/**
 * Immediately gain 1 charge of Aimed Shot, and gain 30% Haste for 15 sec.
 * Lasts 15 sec.
 */
class Trueshot extends Analyzer {
  static dependencies = {
    spellUsable: SpellUsable,
    abilities: Abilities,
  };

  trueshotCasts = 0;
  accumulatedFocusAtTSCast = 0;
  aimedShotsPrTS = 0;
  aimedCritsInTS = 0;
  totalCritsInTS = 0;
  nonCritsInTS = 0;
  executeTrueshots = 0;
  startFocusForCombatant = 0;
  prepullTrueshots = 0;

  _primaryTargets = [];

  on_byPlayer_applybuff(event) {
    const buffId = event.ability.guid;
    if (buffId !== SPELLS.TRUESHOT.id || !event.prepull) {
      return;
    }
    //adds 1 to trueshotCasts to properly show that it was cast prepull
    this.trueshotCasts += 1;
    this.prepullTrueshots += 1;
    //starts the cooldown to ensure proper cast efficiency statistics
    this.spellUsable.beginCooldown(SPELLS.TRUESHOT.id, this.owner.fight.start_time);
  }

  on_byPlayer_cast(event) {
    //checks if we had a prepull trueshot, in which case the firstCast done symbolises our starting focus of that one trueshot
    if (this.prepullTrueshots > 0 && this.startFocusForCombatant === 0) {
      event.classResources.forEach(classResource => {
        if (classResource.type === RESOURCE_TYPES.FOCUS.id && classResource.amount > this.startFocusForCombatant) {
          this.startFocusForCombatant += classResource.amount;
          this.accumulatedFocusAtTSCast += this.startFocusForCombatant;
        }
      });
    }
    const spellId = event.ability.guid;
    if (spellId !== SPELLS.TRUESHOT.id && spellId !== SPELLS.AIMED_SHOT.id) {
      return;
    }
    if (spellId === SPELLS.TRUESHOT.id) {
      this.trueshotCasts += 1;
      if (this.spellUsable.isOnCooldown(SPELLS.AIMED_SHOT.id)) {
        const newChargeCDR = this.abilities.getExpectedCooldownDuration(SPELLS.AIMED_SHOT.id) - this.spellUsable.cooldownRemaining(SPELLS.AIMED_SHOT.id);
        this.spellUsable.endCooldown(SPELLS.AIMED_SHOT.id, false, event.timestamp, newChargeCDR);
      }
      this.accumulatedFocusAtTSCast += event.classResources[0].amount || 0;
      if (this.selectedCombatant.hasBuff(SPELLS.BULLSEYE_BUFF.id, event.timestamp)) {
        this.executeTrueshots += 1;
      }
    }
    if (spellId === SPELLS.AIMED_SHOT.id) {
      this._primaryTargets.push({
        timestampe: event.timestamp,
        targetID: event.targetID,
        targetInstance: event.targetInstance,
      });
    }
  }

  on_byPlayer_damage(event) {
    const spellId = event.ability.guid;
    const isCrit = event.hitType === HIT_TYPES.CRIT || event.hitType === HIT_TYPES.BLOCKED_CRIT;
    if (!this.selectedCombatant.hasBuff(SPELLS.TRUESHOT.id, event.timestamp)) {
      return;
    }
    if (isCrit) {
      this.totalCritsInTS += 1;
    } else {
      this.nonCritsInTS += 1;
    }
    if (spellId !== SPELLS.AIMED_SHOT.id) {
      return;
    }
    const primaryTargetEventIndex = this._primaryTargets.findIndex(primary => primary.targetID === event.targetID && primary.targetInstance === event.targetInstance);
    if (primaryTargetEventIndex !== -1) {
      if (isCrit) {
        this.aimedCritsInTS += 1;
      }
      this.aimedShotsPrTS += 1;
    }
  }

  get percentAimedCrits() {
    return formatPercentage(this.aimedCritsInTS / this.aimedShotsPrTS);
  }

  get percentCastCrits() {
    return formatPercentage(this.totalCritsInTS / (this.totalCritsInTS + this.nonCritsInTS));
  }

  statistic() {
    return (
      <StatisticBox icon={<SpellIcon id={SPELLS.TRUESHOT.id} />}
        value={(
          <React.Fragment>
            {this.averageAimedShots.toFixed(2)}{' '}
            <SpellIcon
              id={SPELLS.AIMED_SHOT.id}
              style={{
                height: '1.3em',
                marginTop: '-.1em',
              }}
            />
            {'  '}
            {this.averageFocus}{' '}
            <ResourceIcon
              id={RESOURCE_TYPES.FOCUS.id}
              style={{
                height: '1.3em',
                marginTop: '-.1em',
              }}
            />
          </React.Fragment>
        )}
        label="Trueshot info"
        tooltip={`Information regarding your average Trueshot window:
        <ul>
          <li>You started your Trueshot windows with an average of ${this.averageFocus} focus.</li>
          <li> You hit an average of ${this.averageAimedShots} Aimed Shots inside each Trueshot window. </li>
          <li> Your Trueshot Aimed Shots had a crit rate of ${this.percentAimedCrits}%. </li>
          <li>Your overall crit rate during Trueshot was ${this.percentCastCrits}%. </li>
          <li>You spent an average of ${this.uptimePerCast} seconds in Trueshot per cast of Trueshot.</li>
        </ul>`} />
    );
  }

  get averageAimedShots() {
    return this.aimedShotsPrTS / this.trueshotCasts;
  }
  get averageFocus() {
    return formatNumber(this.accumulatedFocusAtTSCast / this.trueshotCasts);
  }

  get uptimePerCast() {
    return (this.selectedCombatant.getBuffUptime(SPELLS.TRUESHOT.id) / this.trueshotCasts) / 1000;
  }
  get aimedShotThreshold() {
    return {
      actual: this.averageAimedShots,
      isLessThan: {
        minor: 7,
        average: 6,
        major: 5,
      },
      style: 'decimal',
    };
  }
  get focusThreshold() {
    return {
      actual: this.averageFocus,
      isLessThan: {
        minor: 90,
        average: 80,
        major: 70,
      },
      style: 'number',
    };
  }
  get executeTrueshotThreshold() {
    return {
      actual: this.executeTrueshots,
      isLessThan: {
        minor: 0.5,
        average: 0.7,
        major: 1,
      },
      style: 'number',
    };
  }
  get uptimeThreshold() {
    return {
      actual: this.uptimePerCast,
      isLessThan: {
        minor: 14.9,
        average: 14.7,
        major: 14.5,
      },
      style: 'decimal',
    };
  }
  /** Commenting out for now until we've theorycrafted more into how to optimally utilize Trueshot - not deleting for now in case of possible recycling of some code.
   suggestions(when) {
    when(this.aimedShotThreshold).addSuggestion((suggest, actual, recommended) => {
      return suggest(<React.Fragment>You only cast {actual} <SpellLink id={SPELLS.AIMED_SHOT.id} />s inside your average <SpellLink id={SPELLS.TRUESHOT.id} /> window. This is your only DPS cooldown, and it's important to maximize it to it's fullest potential by getting as many Aimed Shot squeezed in as possible.</React.Fragment>)
        .icon(SPELLS.TRUESHOT.icon)
        .actual(`Average of ${actual} Aimed Shots per Trueshot.`)
        .recommended(`>${recommended} is recommended`);
    });
    when(this.focusThreshold).addSuggestion((suggest, actual, recommended) => {
      return suggest(<React.Fragment>You started your average <SpellLink id={SPELLS.TRUESHOT.id} /> at {actual} focus, try and pool a bit more before casting <SpellLink id={SPELLS.TRUESHOT.id} />. This can be done through casting an additional <SpellLink id={SPELLS.ARCANE_SHOT.id} /> or by monitoring the cooldown of <SpellLink id={SPELLS.TRUESHOT.id} /> and adjusting play to ensure your focus won't be depleted when it comes off cooldown.</React.Fragment>)
        .icon(SPELLS.TRUESHOT.icon)
        .actual(`Average of ${actual > 0 ? actual : this.startFocusForCombatant} focus when starting Trueshot`)
        .recommended(`>${recommended} is recommended`);
    });
    when(this.executeTrueshotThreshold).addSuggestion((suggest, actual) => {
      return suggest(<React.Fragment>You should make sure to have atleast 1 <SpellLink id={SPELLS.TRUESHOT.id} /> cast during execute (where you are buffed by <SpellLink id={SPELLS.BULLSEYE_TRAIT.id} />) to get as much out of <SpellLink id={SPELLS.TRUESHOT.id} /> as possible.</React.Fragment>)
        .icon(SPELLS.TRUESHOT.icon)
        .actual(`You had ${actual} Trueshot casts during Bullseye`)
        .recommended(`casting atleast 1 Trueshot in execute is recommended`);
    });
    when(this.uptimeThreshold).addSuggestion((suggest, actual) => {
      return suggest(<React.Fragment>You should make sure to utilise every possible second of <SpellLink id={SPELLS.TRUESHOT.id} /> uptime as you can. Remember to cast it atleast 15 seconds before the boss dies, so you don't lose out on valuable time, aswell as remember to not cast it until the boss has been engaged.</React.Fragment>)
        .icon(SPELLS.TRUESHOT.icon)
        .actual(`You had an average of ${actual} seconds of Trueshot uptime per cast`)
        .recommended(`15 seconds uptime per cast is recommended`);
    });
  }*/
  statisticOrder = STATISTIC_ORDER.CORE(8);
}

export default Trueshot;
