import Analyzer, { Options, SELECTED_PLAYER } from 'parser/core/Analyzer';

import Events, { ResourceChangeEvent } from 'parser/core/Events';
import SPELLS from 'common/SPELLS/demonhunter';
import Statistic from 'parser/ui/Statistic';
import STATISTIC_CATEGORY from 'parser/ui/STATISTIC_CATEGORY';
import TalentSpellText from 'parser/ui/TalentSpellText';
import { DISRUPTING_FURY_TALENT } from 'common/TALENTS/demonhunter';

export default class SwallowedAnger extends Analyzer {
  furyGain = 0;
  furyWaste = 0;

  constructor(options: Options) {
    super(options);
    this.active = this.selectedCombatant.hasTalent(DISRUPTING_FURY_TALENT);
    if (!this.active) {
      return;
    }
    this.addEventListener(
      Events.resourcechange.by(SELECTED_PLAYER).spell(SPELLS.DISRUPTING_FURY_FURY_GEN),
      this.onEnergizeEvent,
    );
  }

  get furyPerMin() {
    return ((this.furyGain - this.furyWaste) / (this.owner.fightDuration / 60000)).toFixed(2);
  }

  onEnergizeEvent(event: ResourceChangeEvent) {
    this.furyGain += event.resourceChange;
    this.furyWaste += event.waste;
  }

  statistic() {
    const effectiveFuryGain = this.furyGain - this.furyWaste;
    return (
      <Statistic
        size="flexible"
        category={STATISTIC_CATEGORY.TALENTS}
        tooltip={
          <>
            {effectiveFuryGain} Effective Fury gained
            <br />
            {this.furyGain} Total Fury gained
            <br />
            {this.furyWaste} Fury wasted
          </>
        }
      >
        <TalentSpellText talent={DISRUPTING_FURY_TALENT}>
          {this.furyPerMin} <small>Fury per min</small>
        </TalentSpellText>
      </Statistic>
    );
  }
}
