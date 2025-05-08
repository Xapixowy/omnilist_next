import { DiscordPresenceData } from './user-presence';

export type UserPresenceWebSocket = {
  op: number;
  t: 'INIT_STATE' | 'PRESENCE_UPDATE';
  d: DiscordPresenceData;
};
