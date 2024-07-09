import { SpellLink } from 'interface';

import DownInFlamesExplanation from './DownInFlamesExplanation';
import { useInfo } from 'interface/guide';
import { FIERY_BRAND_TALENT, FIERY_DEMISE_TALENT } from 'common/TALENTS/demonhunter';

interface Props {
  includeDownInFlames?: boolean;
  lineBreak?: boolean;
}

const FieryDemiseExplanation = ({ includeDownInFlames, lineBreak }: Props) => {
  const info = useInfo();
  if (!info || !info.combatant.hasTalent(FIERY_DEMISE_TALENT)) {
    return null;
  }
  return (
    <>
      {lineBreak ? <br /> : ' '}
      Always use when <SpellLink spell={FIERY_BRAND_TALENT} /> is applied to the target in order to
      maximise the damage dealt due to <SpellLink spell={FIERY_DEMISE_TALENT} />.
      <DownInFlamesExplanation includeDownInFlames={includeDownInFlames} />
    </>
  );
};

export default FieryDemiseExplanation;
