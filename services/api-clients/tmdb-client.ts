import { Language } from '@/enums/language';
import { env } from '@/env';
import { tryCatch } from '@/functions/try-catch';
import { CreateRequestTokenResponse } from '@/types/responses/tmdb/create-request-token';
import { CreateSessionResponse } from '@/types/responses/tmdb/create-session';
import { CreateSessionWithLoginResponse } from '@/types/responses/tmdb/create-session-with-login';
import axios, { AxiosError, AxiosResponse, HttpStatusCode } from 'axios';

export class TmdbClient {
  static #instance: TmdbClient | undefined;

  private readonly apiKey: string = env.TMDB_API_KEY;
  private readonly baseUrl: string = 'https://api.themoviedb.org/3';

  private constructor() {}

  static getInstance(): TmdbClient {
    if (!this.#instance) {
      this.#instance = new TmdbClient();
    }

    return this.#instance;
  }

  async createRequestToken(): Promise<CreateRequestTokenResponse | null> {
    const response = await axios.get<CreateRequestTokenResponse>(`${this.baseUrl}/authentication/token/new`, {
      params: {
        api_key: this.apiKey,
      },
    });

    return response.status === HttpStatusCode.Ok ? response.data : null;
  }

  async createSessionWithLogin({
    username,
    password,
    requestToken,
  }: {
    username: string;
    password: string;
    requestToken: string;
  }): Promise<CreateSessionWithLoginResponse | null> {
    const response = await tryCatch<AxiosResponse, AxiosError>(
      axios.post<CreateSessionWithLoginResponse>(
        `${this.baseUrl}/authentication/token/validate_with_login`,
        {
          username,
          password,
          request_token: requestToken,
        },
        {
          params: {
            api_key: this.apiKey,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    if (!response.error) {
      return response.data.data;
    }

    return null;
  }

  async createSession({ requestToken }: { requestToken: string }): Promise<CreateSessionResponse | null> {
    const response = await tryCatch<AxiosResponse, AxiosError>(
      axios.post<CreateSessionResponse>(
        `${this.baseUrl}/authentication/session/new`,
        {
          request_token: requestToken,
        },
        {
          params: {
            api_key: this.apiKey,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    console.log(response.error);

    if (!response.error) {
      return response.data.data;
    }

    return null;
  }

  async getFavouriteMovies({
    accountId,
    token,
    language = Language.EN,
    page = 1,
    sortBy = 'created_at.desc',
  }: {
    accountId: number;
    token: string;
    language?: Language;
    page?: number;
    sortBy?: 'created_at.asc' | 'created_at.desc';
  }): Promise<unknown | null> {
    const response = await tryCatch<AxiosResponse, AxiosError>(
      axios.get<unknown>(`${this.baseUrl}/account/${accountId}/favorite/movies`, {
        params: {
          language,
          page,
          sort_by: sortBy,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    );

    if (!response.error) {
      return response.data.data;
    }

    return null;
  }
}
