import React from 'react';
import PropTypes from 'prop-types';

import SPELLS from 'common/SPELLS';
import SpellLink from 'common/SpellLink';
import { TooltipElement } from 'common/Tooltip';
import Checklist from 'parser/shared/modules/features/Checklist';
import Rule from 'parser/shared/modules/features/Checklist/Rule';
import Requirement from 'parser/shared/modules/features/Checklist/Requirement';
import PreparationRule from 'parser/shared/modules/features/Checklist/PreparationRule';
import GenericCastEfficiencyRequirement from 'parser/shared/modules/features/Checklist/GenericCastEfficiencyRequirement';

const SubRogueChecklist = ({ combatant, castEfficiency, thresholds }: any) => {
  const AbilityRequirement = (props: any) => (
    <GenericCastEfficiencyRequirement
      castEfficiency={castEfficiency.getCastEfficiencyForSpellId(props.spell)}
      {...props}
    />
  );
  AbilityRequirement.propTypes = {
    spell: PropTypes.number.isRequired,
  };

  return (
    <Checklist>
      <Rule
        name="Use your offensive cooldowns"
        description={(
          <>
            Subtlety rotation revolves around using your cooldowns effectively. To maximize your damage, you need to stack your cooldowns. Your cooldowns dictate your rotation. A base rule of thumb is: use <SpellLink id={SPELLS.SYMBOLS_OF_DEATH.id} /> on cooldown, and use <SpellLink id={SPELLS.SHADOW_DANCE.id} /> when symbols are active. However you should never cap on <SpellLink id={SPELLS.SHADOW_DANCE.id} /> charges.
          </>
        )}
      >
        <AbilityRequirement spell={SPELLS.SHADOW_DANCE.id} />
        <AbilityRequirement spell={SPELLS.SYMBOLS_OF_DEATH.id} />
        <AbilityRequirement spell={SPELLS.VANISH.id} />
        <AbilityRequirement spell={SPELLS.SHADOW_BLADES.id} />
        {combatant.hasTalent(SPELLS.SECRET_TECHNIQUE_TALENT.id) && (
          <AbilityRequirement spell={SPELLS.SECRET_TECHNIQUE_TALENT.id} />
        )}
      </Rule>
      <Rule
        name="Don't waste resources"
        description={(
          <>
            Since all of Subtlety's damage is tied to resources, it is important to waste as little of them as possible. You should make sure you do not find yourself being Energy capped or casting Combo Point generating abilities when at maximum Combo Points.
          </>
        )}
      >
        <Requirement
          name={(
            <>
              Wasted combo points
            </>
          )}
          thresholds={thresholds.comboPoints}
        />
        <Requirement
          name={(
            <>
              Wasted energy
            </>
          )}
          thresholds={thresholds.energy}
        />
      </Rule>
      <Rule
        name="Utilize Stealth and Shadow Dance to full potential"
        description={(
          <>
            Stealth is a core mechanic for Subtlety. When using <SpellLink id={SPELLS.SHADOW_DANCE.id} />, <SpellLink id={SPELLS.VANISH.id} /> or <SpellLink id={SPELLS.SUBTERFUGE_TALENT.id} /> you need to make the most of your stealth abilities, using up every GCD. To achieve this you might need to pool some energy. Depending on your talents, the amount of energy required differs between 60 and 90. Its also important to use correct spells in stealth, for example <SpellLink id={SPELLS.BACKSTAB.id} /> should be replaced by <SpellLink id={SPELLS.SHADOWSTRIKE.id} />
          </>
        )}
      >
        <Requirement
          name={(
            <>
              <TooltipElement content="Includes Subterfuge if talented">Casts in Stealth/Vanish*</TooltipElement>
            </>
          )}
          thresholds={thresholds.castsInStealth}
        />
        <Requirement
          name={(
            <>
              Casts in <SpellLink id={SPELLS.SHADOW_DANCE.id} />
            </>
          )}
          thresholds={thresholds.castsInShadowDance}
        />
        <Requirement
          name={(
            <>
              <SpellLink id={SPELLS.BACKSTAB.id} /> used from <SpellLink id={SPELLS.SHADOW_DANCE.id} />
            </>
          )}
          thresholds={thresholds.backstabInShadowDance}
        />
        <Requirement
          name={(
            <>
              <SpellLink id={SPELLS.BACKSTAB.id} /> <TooltipElement content="Includes Vanish and Subterfuge if talented">used from Stealth*</TooltipElement>
            </>
          )}
          thresholds={thresholds.backstabInStealth}
        />
      </Rule>
      <PreparationRule thresholds={thresholds} />

    </Checklist>
  );
};

SubRogueChecklist.propTypes = {
  castEfficiency: PropTypes.object.isRequired,
  combatant: PropTypes.shape({
    hasTalent: PropTypes.func.isRequired,
  }).isRequired,
  thresholds: PropTypes.object.isRequired,
};

export default SubRogueChecklist;
