import { useInfo } from 'interface/guide';

import { SpellLink } from 'interface';
import { DEMONIC_TALENT } from 'common/TALENTS/demonhunter';

const NoDemonicExplanation = () => {
  const info = useInfo();
  if (!info || info.combatant.hasTalent(DEMONIC_TALENT)) {
    return null;
  }
  return (
    <p>
      Using this ability without also having <SpellLink spell={DEMONIC_TALENT} /> talented will lead
      to significantly less damage.
    </p>
  );
};

export default NoDemonicExplanation;
