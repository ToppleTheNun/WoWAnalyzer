import { SpellLink } from 'interface';

import { useInfo } from 'interface/guide';
import {
  DOWN_IN_FLAMES_TALENT,
  FIERY_BRAND_TALENT,
  FIERY_DEMISE_TALENT,
} from 'common/TALENTS/demonhunter';

interface Props {
  includeDownInFlames?: boolean;
  lineBreak?: boolean;
}
const DownInFlamesExplanation = ({ includeDownInFlames, lineBreak }: Props) => {
  const info = useInfo();
  if (!info || !info.combatant.hasTalent(DOWN_IN_FLAMES_TALENT) || !includeDownInFlames) {
    return null;
  }
  return (
    <>
      {lineBreak ? <br /> : ' '}
      Always cast one of your charges of <SpellLink spell={FIERY_BRAND_TALENT} /> before casting
      this ability so that you can benefit from <SpellLink spell={FIERY_DEMISE_TALENT} />.
    </>
  );
};

export default DownInFlamesExplanation;
