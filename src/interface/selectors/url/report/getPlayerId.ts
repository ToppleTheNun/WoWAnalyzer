import { getMatchWithPlayer } from './getMatch';
import { Params } from 'react-router-dom';

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

export const getPlayerIdFromParams = (params: Readonly<Params>) => {
  if (params.player) {
    const playerId = Number(params.player.split('-')[0]);
    if (playerId) {
      return playerId;
    }
  }
  return null;
};
