import { SpellLink } from 'interface';
import SPELLS from 'common/SPELLS/demonhunter';

import { useInfo } from 'interface/guide';
import { DEMONIC_TALENT } from 'common/TALENTS/demonhunter';

interface Props {
  lineBreak?: boolean;
}
const DemonicExplanation = ({ lineBreak }: Props) => {
  const info = useInfo();
  if (!info || !info.combatant.hasTalent(DEMONIC_TALENT)) {
    return null;
  }
  return (
    <>
      {lineBreak ? <br /> : ' '}
      It will grant <SpellLink spell={SPELLS.METAMORPHOSIS_HAVOC} /> for a short duration when cast
      due to <SpellLink spell={DEMONIC_TALENT} />.
    </>
  );
};

export default DemonicExplanation;
