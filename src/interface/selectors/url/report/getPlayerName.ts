import { Params } from 'react-router-dom';
import { getMatchWithPlayer } from './getMatch';

export default (pathname: string) => {
  const match = getMatchWithPlayer(pathname);
  if (match && match.params.player) {
    const player = match.params.player;
    const index = player.indexOf('-');
    const hasSeparator = index !== -1;
    const hasAnonSeparator = player.includes('+');
    if (hasSeparator) {
      return player.substr(index + 1);
    }
    if (hasAnonSeparator) {
      return player.replace('+', ' ');
    }
    if (!Number.isInteger(player)) {
      return player;
    }
    return null;
  }
  return null;
};

export const getPlayerNameFromParams = (params: Readonly<Params>) => {
  if (params.player) {
    const player = params.player;
    const index = player.indexOf('-');
    const hasSeparator = index !== -1;
    const hasAnonSeparator = player.includes('+');
    if (hasSeparator) {
      return player.substr(index + 1);
    }
    if (hasAnonSeparator) {
      return player.replace('+', ' ');
    }
    if (!Number.isInteger(player)) {
      return player;
    }
    return null;
  }
  return null;
};
