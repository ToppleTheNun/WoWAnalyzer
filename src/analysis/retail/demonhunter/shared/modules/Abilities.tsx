import SPELLS from 'common/SPELLS/demonhunter';

import { SpellLink } from 'interface';
import CoreAbilities from 'parser/core/modules/Abilities';
import { SpellbookAbility } from 'parser/core/modules/Ability';
import SPELL_CATEGORY from 'parser/core/SPELL_CATEGORY';
import { PITCH_BLACK_SCALING } from 'analysis/retail/demonhunter/shared';
import {
  CHAOS_NOVA_TALENT,
  CONSUME_MAGIC_TALENT,
  DARKNESS_TALENT,
  FELBLADE_TALENT,
  ILLUMINATED_SIGILS_TALENT,
  IMPROVED_SIGIL_OF_MISERY_TALENT,
  PITCH_BLACK_TALENT,
  SIGIL_OF_MISERY_TALENT,
  SIGIL_OF_SPITE_TALENT,
  THE_HUNT_TALENT,
} from 'common/TALENTS/demonhunter';

export default class Abilities extends CoreAbilities {
  spellbook(): SpellbookAbility[] {
    const combatant = this.selectedCombatant;
    return [
      // Baseline
      {
        spell: SPELLS.GLIDE_DH.id,
        category: SPELL_CATEGORY.UTILITY,
        cooldown: 1,
        gcd: null,
      },
      {
        spell: SPELLS.DISRUPT.id,
        category: SPELL_CATEGORY.UTILITY,
        cooldown: 15,
        gcd: null,
      },
      {
        spell: SPELLS.TORMENT.id,
        category: SPELL_CATEGORY.UTILITY,
        cooldown: 8,
        gcd: null,
      },
      {
        spell: SPELLS.SPECTRAL_SIGHT.id,
        category: SPELL_CATEGORY.UTILITY,
        cooldown: 60,
        gcd: {
          base: 1500,
        },
      },

      // Talents
      {
        spell: FELBLADE_TALENT.id,
        enabled: combatant.hasTalent(FELBLADE_TALENT),
        category: SPELL_CATEGORY.ROTATIONAL,
        // Felblade cooldown can be reset by Demon Bite. But its CD reset is not any event, so can't track if it resets or not.
        cooldown: (haste) => 15 / (1 + haste),
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.95,
          extraSuggestion:
            'This is an important Fury generator spell. Try to always cast on cooldown, but beware to not waste the Fury generation it provides. And also it can be used to charge to the desired target, making it very strong movement spell.',
        },
      },
      {
        spell: CHAOS_NOVA_TALENT.id,
        enabled: combatant.hasTalent(CHAOS_NOVA_TALENT),
        category: SPELL_CATEGORY.UTILITY,
        cooldown: 45,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: CONSUME_MAGIC_TALENT.id,
        enabled: combatant.hasTalent(CONSUME_MAGIC_TALENT),
        category: SPELL_CATEGORY.UTILITY,
        cooldown: 10,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: THE_HUNT_TALENT.id,
        enabled: combatant.hasTalent(THE_HUNT_TALENT),
        category: SPELL_CATEGORY.COOLDOWNS,
        cooldown: 90,
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.8,
          extraSuggestion: (
            <>
              The only time you should delay casting <SpellLink spell={THE_HUNT_TALENT} /> is when
              you're expecting adds to spawn soon.
            </>
          ),
        },
        damageSpellIds: [SPELLS.THE_HUNT_CHARGE.id, SPELLS.THE_HUNT_DOT.id],
      },
      {
        spell: DARKNESS_TALENT.id,
        enabled: combatant.hasTalent(DARKNESS_TALENT),
        category: SPELL_CATEGORY.DEFENSIVE,
        cooldown: 300 - PITCH_BLACK_SCALING[combatant.getTalentRank(PITCH_BLACK_TALENT)],
        gcd: {
          base: 1500,
        },
      },

      // Sigils
      {
        spell: [SIGIL_OF_MISERY_TALENT.id, SPELLS.SIGIL_OF_MISERY_PRECISE.id],
        enabled: this.selectedCombatant.hasTalent(SIGIL_OF_MISERY_TALENT),
        charges: 1 + (combatant.hasTalent(ILLUMINATED_SIGILS_TALENT) ? 1 : 0),
        category: SPELL_CATEGORY.UTILITY,
        cooldown: 120 - (combatant.hasTalent(IMPROVED_SIGIL_OF_MISERY_TALENT) ? 30 : 0),
        gcd: {
          base: 1500,
        },
      },
      {
        spell: [SPELLS.SIGIL_OF_FLAME.id, SPELLS.SIGIL_OF_FLAME_PRECISE.id],
        category: SPELL_CATEGORY.ROTATIONAL_AOE,
        charges: 1 + (combatant.hasTalent(ILLUMINATED_SIGILS_TALENT) ? 1 : 0),
        cooldown: 30,
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.9,
          extraSuggestion: `Cast on cooldown for a dps increase.`,
        },
        damageSpellIds: [SPELLS.SIGIL_OF_FLAME_DEBUFF.id],
      },
      {
        spell: [SIGIL_OF_SPITE_TALENT.id, SPELLS.SIGIL_OF_SPITE_PRECISE.id],
        category: SPELL_CATEGORY.ROTATIONAL,
        cooldown: 60,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasTalent(SIGIL_OF_SPITE_TALENT),
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.9,
          extraSuggestion: (
            <>
              The only time you should delay casting <SpellLink spell={SIGIL_OF_SPITE_TALENT} /> is
              when you're expecting adds to spawn soon.
            </>
          ),
        },
      },
    ];
  }
}
