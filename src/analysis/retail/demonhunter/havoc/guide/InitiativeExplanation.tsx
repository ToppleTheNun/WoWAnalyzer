import { SpellLink } from 'interface';

import { useInfo } from 'interface/guide';
import { INITIATIVE_TALENT, VENGEFUL_RETREAT_TALENT } from 'common/TALENTS/demonhunter';

const InitiativeExplanation = () => {
  const info = useInfo();
  if (!info || !info.combatant.hasTalent(INITIATIVE_TALENT)) {
    return null;
  }
  return (
    <p>
      Always use after casting <SpellLink spell={VENGEFUL_RETREAT_TALENT} /> so that you benefit
      from the increased critical strike chance provided by <SpellLink spell={INITIATIVE_TALENT} />.
    </p>
  );
};

export default InitiativeExplanation;
