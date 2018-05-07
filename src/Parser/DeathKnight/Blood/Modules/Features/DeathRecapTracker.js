import React from 'react';
import Analyzer from 'Parser/Core/Analyzer';
import Combatants from 'Parser/Core/Modules/Combatants';
import Abilities from 'Parser/Core/Modules/Abilities';
import SPELLS from 'common/SPELLS';
import SpellUsable from 'Parser/Core/Modules/SpellUsable';

import Tab from 'Main/Tab';
import DeathRecap from './DeathRecap';

const EXTERNAL_COOLDOWNS = [
  SPELLS.IRONBARK.id,
  SPELLS.LIFE_COCOON.id,
  SPELLS.BLESSING_OF_PROTECTION.id,
  SPELLS.BLESSING_OF_SACRIFICE.id,
  SPELLS.GUARDIAN_SPIRIT.id,
  SPELLS.PAIN_SUPPRESSION.id,
  SPELLS.POWER_WORD_BARRIER_BUFF.id,
];

const DEFENSIVE_BUFFS = [
  SPELLS.BONE_SHIELD.id,
  SPELLS.DANCING_RUNE_WEAPON.id,
];

class DeathRecapTracker extends Analyzer {

  deaths = [];
  events = [];
  healed = [];
  damaged = [];
  cooldowns = [];
  buffs = [];

  static dependencies = {
    combatants: Combatants,
    abilities: Abilities,
    spellUsable: SpellUsable,
  };

  on_initialized() {
    this.cooldowns = this.abilities.abilities.filter(e => 
      (e.category === Abilities.SPELL_CATEGORIES.DEFENSIVE || e.category === Abilities.SPELL_CATEGORIES.SEMI_DEFENSIVE) &&
      e.enabled === true
    );
    this.buffs = EXTERNAL_COOLDOWNS.concat(this.cooldowns).concat(DEFENSIVE_BUFFS);
  }

  addEvent(event) {
    const extendedEvent = event;
    extendedEvent.time = event.timestamp - this.owner.fight.start_time;
    extendedEvent.cooldownsAvailable = this.cooldowns.filter(e => this.spellUsable.isAvailable(e.spell.id));
    extendedEvent.cooldownsUsed = this.cooldowns.filter(e => !this.spellUsable.isAvailable(e.spell.id));
    extendedEvent.buffsUp = this.buffs.filter(e => this.combatants.selected.hasBuff(e.spell ? e.spell.id : e));
    this.events.push(extendedEvent);
  }

  on_toPlayer_heal(event) {
    this.addEvent(event);
  }

  on_toPlayer_damage(event) {  
    this.addEvent(event);
  }

  on_toPlayer_death(event) {
    this.deaths.push(event.timestamp);
  }

  get secondsBeforeDeath() {
    const deaths = new Array(this.deaths.length);
    this.deaths.forEach((deathtime, index) => {
      deaths[index] = {
        deathtime: deathtime,
        events: this.events,
        open: false,
      };
    });
    return deaths;
  }

  tab() {
    return {
      title: 'Death Recap',
      url: 'death-recap',
      render: () => (
        <Tab>
          <DeathRecap events={this.secondsBeforeDeath} />
        </Tab>
      ),
    };
  }
}

export default DeathRecapTracker;
