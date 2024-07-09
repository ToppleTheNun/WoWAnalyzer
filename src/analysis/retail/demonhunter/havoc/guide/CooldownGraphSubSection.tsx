import { Talent } from 'common/TALENTS/types';
import { SubSection, useAnalyzer, useInfo } from 'interface/guide';

import CastEfficiency from 'parser/shared/modules/CastEfficiency';
import CastEfficiencyBar from 'parser/ui/CastEfficiencyBar';
import SPELLS from 'common/SPELLS/demonhunter';
import { GapHighlight } from 'parser/ui/CooldownBar';
import {
  ESSENCE_BREAK_TALENT,
  EYE_BEAM_TALENT,
  FEL_BARRAGE_TALENT,
  GLAIVE_TEMPEST_TALENT,
  INITIATIVE_TALENT,
  SIGIL_OF_SPITE_TALENT,
  THE_HUNT_TALENT,
  VENGEFUL_RETREAT_TALENT,
} from 'common/TALENTS/demonhunter';

type Cooldown = {
  talent: Talent;
  extraTalents?: Talent[];
};

const cooldownsToCheck: Cooldown[] = [
  { talent: EYE_BEAM_TALENT },
  { talent: SIGIL_OF_SPITE_TALENT },
  { talent: THE_HUNT_TALENT },
  { talent: ESSENCE_BREAK_TALENT },
  { talent: GLAIVE_TEMPEST_TALENT },
  { talent: FEL_BARRAGE_TALENT },
  {
    talent: VENGEFUL_RETREAT_TALENT,
    extraTalents: [INITIATIVE_TALENT],
  },
];

const CooldownGraphSubsection = () => {
  const info = useInfo();
  const castEfficiency = useAnalyzer(CastEfficiency);
  if (!info || !castEfficiency) {
    return null;
  }

  const cooldowns = cooldownsToCheck.filter((cooldown) => {
    const hasTalent = info.combatant.hasTalent(cooldown.talent);
    const hasExtraTalents =
      cooldown.extraTalents?.reduce(
        (acc, talent) => acc && info.combatant.hasTalent(talent),
        true,
      ) ?? true;
    return hasTalent && hasExtraTalents;
  });
  const hasTooManyCasts = cooldowns.some((cooldown) => {
    const casts = castEfficiency.getCastEfficiencyForSpell(cooldown.talent)?.casts ?? 0;
    return casts >= 10;
  });

  return (
    <SubSection>
      <p>
        <strong>Cooldown Graph</strong> - this graph shows when you used your cooldowns and how long
        you waited to use them again. Grey segments show when the spell was available, yellow
        segments show when the spell was cooling down. Red segments highlight times when you could
        have fit a whole extra use of the cooldown.
      </p>
      <CastEfficiencyBar
        spellId={SPELLS.METAMORPHOSIS_HAVOC.id}
        gapHighlightMode={GapHighlight.FullCooldown}
        minimizeIcons={hasTooManyCasts}
      />
      {cooldowns.map((cooldownCheck) => (
        <CastEfficiencyBar
          key={cooldownCheck.talent.id}
          spellId={cooldownCheck.talent.id}
          gapHighlightMode={GapHighlight.FullCooldown}
          minimizeIcons={hasTooManyCasts}
        />
      ))}
    </SubSection>
  );
};

export default CooldownGraphSubsection;
