import SPELLS from 'common/SPELLS/demonhunter';

import BLOODLUST_BUFFS from 'game/BLOODLUST_BUFFS';
import CoreAuras from 'parser/core/modules/Auras';
import {
  DARKNESS_TALENT,
  FELBLADE_TALENT,
  TACTICAL_RETREAT_TALENT,
  VENGEFUL_RETREAT_TALENT,
} from 'common/TALENTS/demonhunter';

class Buffs extends CoreAuras {
  auras() {
    const combatant = this.selectedCombatant;

    return [
      {
        spellId: SPELLS.CHAOS_THEORY_BUFF.id, //Chaos Theory Legendary
        timelineHighlight: true,
        triggeredBySpellId: [SPELLS.DEATH_SWEEP.id, SPELLS.BLADE_DANCE.id],
      },
      {
        spellId: SPELLS.METAMORPHOSIS_HAVOC_BUFF.id,
        timelineHighlight: true,
        triggeredBySpellId: SPELLS.METAMORPHOSIS_HAVOC.id,
      },
      {
        spellId: SPELLS.IMMOLATION_AURA.id,
        timelineHighlight: true,
        triggeredBySpellId: SPELLS.IMMOLATION_AURA.id,
      },
      {
        spellId: FELBLADE_TALENT.id,
        timelineHighlight: false,
        triggeredBySpellId: FELBLADE_TALENT.id,
      },
      {
        spellId: SPELLS.BLUR_BUFF.id,
        triggeredBySpellId: SPELLS.BLUR.id,
      },
      {
        spellId: DARKNESS_TALENT.id,
        triggeredBySpellId: DARKNESS_TALENT.id,
        enabled: combatant.hasTalent(DARKNESS_TALENT),
      },
      {
        spellId: SPELLS.SIGIL_OF_FLAME_DEBUFF.id,
        triggeredBySpellId: [SPELLS.SIGIL_OF_FLAME_PRECISE.id, SPELLS.SIGIL_OF_FLAME.id],
      },
      {
        spellId: TACTICAL_RETREAT_TALENT.id,
        triggeredBySpellId: VENGEFUL_RETREAT_TALENT.id,
        enabled: combatant.hasTalent(TACTICAL_RETREAT_TALENT),
      },
      {
        spellId: Object.keys(BLOODLUST_BUFFS).map((item) => Number(item)),
        timelineHighlight: true,
      },
    ];
  }
}

export default Buffs;
