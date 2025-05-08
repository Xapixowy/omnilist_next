import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { DiscordPresenceClient } from '../services/discord-presence-client';
import { DiscordStatus } from '../types/user-presence';

type DiscordPresenceContext = {
  status: DiscordStatus;
  setStatus: (status: DiscordStatus) => void;
};

const DiscordPresenceContext = createContext<DiscordPresenceContext | undefined>(undefined);

export const useDiscordPresenceContext = (): DiscordPresenceContext => {
  const context = useContext(DiscordPresenceContext);

  if (context === undefined) {
    throw new Error('useDiscordPresenceContext must be used within a DiscordPresenceProvider');
  }

  return context;
};

export const DiscordPresenceProvider = (props: { status: DiscordStatus; userId: string; children: ReactNode }) => {
  const [status, setStatus] = useState<DiscordStatus>(props.status);
  const discordPresenceClient = DiscordPresenceClient.getInstance();

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchStatus = async () => {
      const data = await discordPresenceClient.userPresence(props.userId);

      if (!data) {
        return;
      }

      setStatus(data.data.discord_status);
    };

    fetchStatus();

    const wsDisconnect = discordPresenceClient.userPresenceWebSocket(props.userId, (data) => {
      if (!data) {
        fetchStatus();
        intervalId = setInterval(fetchStatus, 60000);
        return;
      }

      setStatus(data.discord_status);
    });

    return () => {
      if (intervalId) clearInterval(intervalId);
      wsDisconnect();
    };
  }, []);

  return (
    <DiscordPresenceContext.Provider value={{ status, setStatus }}>{props.children}</DiscordPresenceContext.Provider>
  );
};
