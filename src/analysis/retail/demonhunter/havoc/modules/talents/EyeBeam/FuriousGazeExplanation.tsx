import { SpellLink } from 'interface';
import SPELLS from 'common/SPELLS/demonhunter';

import { useInfo } from 'interface/guide';
import { FURIOUS_GAZE_TALENT } from 'common/TALENTS/demonhunter';

interface Props {
  lineBreak?: boolean;
}
const DemonicExplanation = ({ lineBreak }: Props) => {
  const info = useInfo();
  if (!info || !info.combatant.hasTalent(FURIOUS_GAZE_TALENT)) {
    return null;
  }
  return (
    <>
      {lineBreak ? <br /> : ' '}
      It will grant <SpellLink spell={SPELLS.FURIOUS_GAZE} /> for a short duration when cast due to{' '}
      <SpellLink spell={FURIOUS_GAZE_TALENT} />.
    </>
  );
};

export default DemonicExplanation;
