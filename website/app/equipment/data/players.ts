// Pro player setups, refreshed weekly by the pro-setups-update routine (.claude/skills/pro-setups-update).
// Every slot cites a source and an "as of" date; non-retail gear is recorded as a `variant`, never as the retail item.
import type { Player } from "../models";
import { menPlayers } from "./players-men";
import { womenPlayers } from "./players-women";

export const players: Player[] = [...menPlayers, ...womenPlayers];
