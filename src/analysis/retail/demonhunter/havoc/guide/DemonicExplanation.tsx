import { useInfo } from 'interface/guide';

import SPELLS from 'common/SPELLS/demonhunter';
import { SpellLink } from 'interface';
import { DEMONIC_TALENT, EYE_BEAM_TALENT } from 'common/TALENTS/demonhunter';

const DemonicExplanation = () => {
  const info = useInfo();
  if (!info || !info.combatant.hasTalent(DEMONIC_TALENT)) {
    return null;
  }
  return (
    <p>
      Always use after casting <SpellLink spell={EYE_BEAM_TALENT} /> so that you can benefit from
      the <SpellLink spell={SPELLS.METAMORPHOSIS_HAVOC} /> provided by{' '}
      <SpellLink spell={DEMONIC_TALENT} />.
    </p>
  );
};

export default DemonicExplanation;
