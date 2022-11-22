import { getMatchWithFightId } from './getMatch';

export default (pathname: string) => {
  const match = getMatchWithFightId(pathname);
  if (match && match.params.fightId) {
    return match.params.fightId.split('-');
  }
  return null;
};
