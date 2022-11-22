import { getMatchWithPlayer } from './getMatch';

export default (pathname: string) => {
  const match = getMatchWithPlayer(pathname);
  if (match && match.params.player) {
    const playerId = Number(match.params.player.split('-')[0]);
    if (playerId) {
      return playerId;
    }
  }
  return null;
};
