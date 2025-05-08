import axios, { AxiosResponse } from 'axios';
import { DiscordPresenceData, UserPresence } from '../types/user-presence';
import { UserPresenceWebSocket } from '../types/user-presence-websocket';

export class DiscordPresenceClient {
  static #instance: DiscordPresenceClient | undefined;

  private readonly apiUrl: string = 'https://api.lanyard.rest/v1';
  private readonly webSocketUrl: string = 'wss://api.lanyard.rest/socket/';
  private readonly webSocketTimeout: number = 60 * 1024;

  private constructor() {}

  static getInstance(): DiscordPresenceClient {
    if (!this.#instance) {
      this.#instance = new DiscordPresenceClient();
    }

    return this.#instance;
  }

  async userPresence(userId: string): Promise<UserPresence | null> {
    try {
      const response: AxiosResponse<UserPresence> = await axios.get(`${this.apiUrl}/users/${userId}`);

      if (response.status !== 200) {
        return null;
      }

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error.message);
      }

      return null;
    }
  }

  userPresenceWebSocket(userId: string, callback: (data: DiscordPresenceData | null) => void): () => void {
    const ws = new WebSocket(this.webSocketUrl);

    let isConnected = false;

    const connectionTimeout = setTimeout(() => {
      if (!isConnected) {
        ws.close();
        callback(null);
      }
    }, this.webSocketTimeout);

    ws.onopen = () => {
      isConnected = true;
      clearTimeout(connectionTimeout);
      ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: userId } }));
    };

    ws.onmessage = (event: MessageEvent) => {
      const data: UserPresenceWebSocket = JSON.parse(event.data);

      if (['INIT_STATE', 'PRESENCE_UPDATE'].includes(data.t)) {
        callback(data.d);
      }
    };

    ws.onerror = () => {
      clearTimeout(connectionTimeout);
      callback(null);
    };

    return () => {
      clearTimeout(connectionTimeout);

      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
        ws.close();
      }
    };
  }
}
