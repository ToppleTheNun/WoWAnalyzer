import SPELLS from 'common/SPELLS/demonhunter';

import { SpellLink } from 'interface';
import SharedAbilities from 'analysis/retail/demonhunter/shared/modules/Abilities';
import { SpellbookAbility } from 'parser/core/modules/Ability';
import SPELL_CATEGORY from 'parser/core/SPELL_CATEGORY';
import {
  CHAMPION_OF_THE_GLAIVE_SCALING,
  MASTER_OF_THE_GLAIVE_SCALING,
} from 'analysis/retail/demonhunter/shared';
import { getInfernalStrikeCooldown } from 'analysis/retail/demonhunter/vengeance/modules/spells/InfernalStrike';
import { getMetamorphosisCooldown } from 'analysis/retail/demonhunter/shared/modules/talents/MetamorphosisCooldown';
import {
  DOWN_IN_FLAMES_CDR_SCALING,
  PERFECTLY_BALANCED_GLAIVE_SCALING,
} from 'analysis/retail/demonhunter/vengeance/constants';
import {
  BLAZING_PATH_TALENT,
  BULK_EXTRACTION_TALENT,
  CHAMPION_OF_THE_GLAIVE_TALENT,
  DOWN_IN_FLAMES_TALENT,
  FALLOUT_TALENT,
  FEL_DEVASTATION_TALENT,
  FIERY_BRAND_TALENT,
  FRACTURE_TALENT,
  ILLUMINATED_SIGILS_TALENT,
  MASTER_OF_THE_GLAIVE_TALENT,
  PERFECTLY_BALANCED_GLAIVE_TALENT,
  QUICKENED_SIGILS_TALENT,
  SIGIL_OF_CHAINS_TALENT,
  SIGIL_OF_SILENCE_TALENT,
  SOUL_BARRIER_TALENT,
  SOUL_CARVER_TALENT,
  SPIRIT_BOMB_TALENT,
  VENGEFUL_RETREAT_TALENT,
} from 'common/TALENTS/demonhunter';

class Abilities extends SharedAbilities {
  spellbook(): SpellbookAbility[] {
    const combatant = this.selectedCombatant;
    return [
      // Rotation
      {
        spell: SPELLS.IMMOLATION_AURA.id,
        category: SPELL_CATEGORY.ROTATIONAL,
        cooldown: (haste) => 15 / (1 + haste),
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.9,
          extraSuggestion: (
            <>
              This is a great Fury filler spell. Try to always cast it on cooldown, specially when
              using the <SpellLink spell={FALLOUT_TALENT} /> talent in order to maximize your{' '}
              <SpellLink spell={SPELLS.SOUL_FRAGMENT} /> generation.
            </>
          ),
        },
        damageSpellIds: [
          SPELLS.IMMOLATION_AURA_INITIAL_HIT_DAMAGE.id,
          SPELLS.IMMOLATION_AURA_BUFF_DAMAGE.id,
        ],
      },
      {
        spell: [combatant.hasTalent(FRACTURE_TALENT) ? FRACTURE_TALENT.id : SPELLS.SHEAR.id],
        category: SPELL_CATEGORY.ROTATIONAL,
        cooldown: combatant.hasTalent(FRACTURE_TALENT) ? (haste) => 4.5 / (1 + haste) : 0,
        charges: combatant.hasTalent(FRACTURE_TALENT) ? 2 : 0,
        castEfficiency: {
          suggestion: combatant.hasTalent(FRACTURE_TALENT),
          recommendedEfficiency: 0.9,
        },
        gcd: {
          base: 1500,
        },
      },

      // Defensive / Healing
      {
        spell: SPELLS.SOUL_CLEAVE.id,
        category: SPELL_CATEGORY.ROTATIONAL_AOE,
        gcd: {
          base: 1500,
        },
        isDefensive: true,
      },
      {
        spell: SPELLS.METAMORPHOSIS_TANK.id,
        category: SPELL_CATEGORY.DEFENSIVE,
        cooldown: getMetamorphosisCooldown(combatant),
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.5,
        },
        isDefensive: true,
      },
      {
        spell: FIERY_BRAND_TALENT.id,
        category: SPELL_CATEGORY.DEFENSIVE,
        cooldown: 60 - DOWN_IN_FLAMES_CDR_SCALING[combatant.getTalentRank(DOWN_IN_FLAMES_TALENT)],
        charges: 1 + (combatant.hasTalent(DOWN_IN_FLAMES_TALENT) ? 1 : 0),
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.5,
          extraSuggestion: <>Powerful CD. Use it during high damage moments.</>,
        },
        isDefensive: true,
      },
      {
        spell: SPELLS.DEMON_SPIKES.id,
        category: SPELL_CATEGORY.DEFENSIVE,
        cooldown: (haste) => 20 / (1 + haste),
        charges: 2,
        isDefensive: true,
      },

      // Talents
      {
        spell: VENGEFUL_RETREAT_TALENT.id,
        category: SPELL_CATEGORY.UTILITY,
        cooldown: 25,
        // Not actually on the GCD but blocks all spells during its animation for 1 second. The issue is you can follow up any ability on the GCD with Vengeful Retreat, so it can still cause overlap.
        gcd: null,
      },
      {
        spell: [SIGIL_OF_SILENCE_TALENT.id, SPELLS.SIGIL_OF_SILENCE_PRECISE.id],
        enabled: this.selectedCombatant.hasTalent(SIGIL_OF_SILENCE_TALENT),
        charges: 1 + (combatant.hasTalent(ILLUMINATED_SIGILS_TALENT) ? 1 : 0),
        category: SPELL_CATEGORY.UTILITY,
        cooldown: 60 * (1 - (combatant.hasTalent(QUICKENED_SIGILS_TALENT) ? 0.2 : 0)),
        gcd: {
          base: 1500,
        },
      },
      {
        spell: [SIGIL_OF_CHAINS_TALENT.id, SPELLS.SIGIL_OF_CHAINS_PRECISE.id],
        enabled: combatant.hasTalent(SIGIL_OF_CHAINS_TALENT),
        category: SPELL_CATEGORY.UTILITY,
        cooldown: 60,
        charges: 1 + (combatant.hasTalent(ILLUMINATED_SIGILS_TALENT) ? 1 : 0),
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPIRIT_BOMB_TALENT.id,
        category: SPELL_CATEGORY.ROTATIONAL,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SOUL_BARRIER_TALENT.id,
        enabled: combatant.hasTalent(SOUL_BARRIER_TALENT),
        category: SPELL_CATEGORY.DEFENSIVE,
        cooldown: 30,
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.8,
        },
        isDefensive: true,
      },
      {
        spell: BULK_EXTRACTION_TALENT.id,
        enabled: combatant.hasTalent(BULK_EXTRACTION_TALENT),
        category: SPELL_CATEGORY.DEFENSIVE,
        cooldown: 60,
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.8,
        },
        isDefensive: true,
      },
      {
        spell: FEL_DEVASTATION_TALENT.id,
        category: SPELL_CATEGORY.ROTATIONAL_AOE,
        cooldown: 40,
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.8,
          extraSuggestion: <>This is a great healing and AoE damage burst spell.</>,
        },
        isDefensive: true,
      },
      {
        spell: SOUL_CARVER_TALENT.id,
        category: SPELL_CATEGORY.UTILITY,
        cooldown: 60,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasTalent(SOUL_CARVER_TALENT),
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.8,
          extraSuggestion: (
            <>
              The only time you should delay casting <SpellLink spell={SOUL_CARVER_TALENT} /> is
              when you're expecting are preparing for a burst window.
            </>
          ),
        },
      },

      // Utility
      {
        spell: SPELLS.INFERNAL_STRIKE.id,
        category: SPELL_CATEGORY.UTILITY,
        cooldown: getInfernalStrikeCooldown(combatant),
        charges: 1 + (combatant.hasTalent(BLAZING_PATH_TALENT) ? 1 : 0),
        enabled: false, // TODO: change this to true, when infernal strike logging is working, see infernalstrike module for more details.
      },

      {
        spell: SPELLS.THROW_GLAIVE_VENGEANCE.id,
        category: SPELL_CATEGORY.UTILITY,
        cooldown:
          9 -
          PERFECTLY_BALANCED_GLAIVE_SCALING[
            combatant.getTalentRank(PERFECTLY_BALANCED_GLAIVE_TALENT)
          ],
        charges:
          1 +
          MASTER_OF_THE_GLAIVE_SCALING[combatant.getTalentRank(MASTER_OF_THE_GLAIVE_TALENT)] +
          CHAMPION_OF_THE_GLAIVE_SCALING[combatant.getTalentRank(CHAMPION_OF_THE_GLAIVE_TALENT)],
        gcd: {
          base: 1500,
        },
      },

      // Misc
      {
        spell: [
          SPELLS.SOUL_FRAGMENT.id,
          SPELLS.SOUL_FRAGMENT_KILLING_BLOW.id,
          SPELLS.SOUL_FRAGMENT_FODDER.id,
        ],
        category: SPELL_CATEGORY.HIDDEN,
        gcd: null,
      },

      ...super.spellbook(),
    ];
  }
}

export default Abilities;
