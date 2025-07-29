import { v2 } from '@shared/db';
import { entries } from 'lodash';

export type PlayerWithId = v2.Player & { id: v2.PlayerId };
export type PlayersWithIds = PlayerWithId[];
export const playersWithIds = (players: v2.Players): PlayersWithIds =>
    entries(players).map(([id, player]) => ({ id, ...player } as const));
