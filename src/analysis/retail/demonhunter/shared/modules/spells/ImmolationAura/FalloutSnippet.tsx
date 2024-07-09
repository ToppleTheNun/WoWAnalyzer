import { useInfo } from 'interface/guide';

import { SpellLink } from 'interface';
import SPELLS from 'common/SPELLS/demonhunter';
import { FALLOUT_TALENT } from 'common/TALENTS/demonhunter';

const FalloutSnippet = () => {
  const info = useInfo();
  if (!info || !info.combatant.hasTalent(FALLOUT_TALENT)) {
    // This is intentionally an empty fragment.
    return <></>;
  }
  return (
    <>
      {' '}
      and having a chance to shatter a <SpellLink spell={SPELLS.SOUL_FRAGMENT} /> with{' '}
      <SpellLink spell={FALLOUT_TALENT} />
    </>
  );
};

export default FalloutSnippet;
