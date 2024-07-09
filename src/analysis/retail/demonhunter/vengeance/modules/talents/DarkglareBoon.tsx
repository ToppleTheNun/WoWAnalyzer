import Analyzer, { Options, SELECTED_PLAYER } from 'parser/core/Analyzer';

import Events, { EndChannelEvent } from 'parser/core/Events';
import SpellUsable from 'parser/shared/modules/SpellUsable';
import { DARKGLARE_BOON_TALENT, FEL_DEVASTATION_TALENT } from 'common/TALENTS/demonhunter';

// DGB gives AT LEAST 20% of the 60s back.
const MINIMUM_CDR = 0.2 * 60000;

export default class DarkglareBoon extends Analyzer {
  static dependencies = {
    spellUsable: SpellUsable,
  };

  protected spellUsable!: SpellUsable;

  constructor(options: Options) {
    super(options);
    this.active = this.selectedCombatant.hasTalent(DARKGLARE_BOON_TALENT);
    if (!this.active) {
      return;
    }
    this.addEventListener(
      Events.EndChannel.by(SELECTED_PLAYER).spell(FEL_DEVASTATION_TALENT),
      this.onFelDevastationCast,
    );
  }

  onFelDevastationCast(event: EndChannelEvent) {
    this.spellUsable.reduceCooldown(FEL_DEVASTATION_TALENT.id, MINIMUM_CDR, event.timestamp);
  }
}
