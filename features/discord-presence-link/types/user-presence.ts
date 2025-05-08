type DiscordEmoji = {
  name: string;
};

type DiscordActivity = {
  id: string;
  name: string;
  type: number;
  state?: string;
  emoji?: DiscordEmoji;
  created_at: number;
};

type DiscordUser = {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  clan: null;
  avatar_decoration_data: null;
  bot: boolean;
  global_name: string;
  primary_guild: null;
  display_name: string;
  public_flags: number;
  collectibles: null;
};

export type DiscordStatus = 'online' | 'offline' | 'idle' | 'dnd';

export type DiscordPresenceData = {
  kv: Record<string, unknown>;
  discord_user: DiscordUser;
  activities: DiscordActivity[];
  discord_status: DiscordStatus;
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  listening_to_spotify: boolean;
  spotify: null;
};

export type UserPresence = {
  success: boolean;
  data: DiscordPresenceData;
};
