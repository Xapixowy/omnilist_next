import { Language } from '@/enums/language';
import { env } from '@/env';
import { tryCatch } from '@/functions/try-catch';
import { AddFavoriteResponse } from '@/types/responses/tmdb/add-favorite';
import { AddMovieRatingResponse } from '@/types/responses/tmdb/add-movie-rating';
import { AddToWatchlistResponse } from '@/types/responses/tmdb/add-to-watchlist';
import { CreateRequestTokenResponse } from '@/types/responses/tmdb/create-request-token';
import { CreateSessionResponse } from '@/types/responses/tmdb/create-session';
import { CreateSessionWithLoginResponse } from '@/types/responses/tmdb/create-session-with-login';
import { DeleteMovieRatingResponse } from '@/types/responses/tmdb/delete-movie-rating';
import { GetFavoriteMoviesResponse } from '@/types/responses/tmdb/get-favorite-movies';
import { GetMovieGenresResponse } from '@/types/responses/tmdb/get-movie-genres';
import { GetMoviesWatchlistResponse } from '@/types/responses/tmdb/get-movies-watchlist';
import { GetNowPlayingMoviesResponse } from '@/types/responses/tmdb/get-now-playing-movies';
import { GetPopularMoviesResponse } from '@/types/responses/tmdb/get-popular-movies';
import { GetRatedMoviesResponse } from '@/types/responses/tmdb/get-rated-movies';
import { GetTrendingMoviesResponse } from '@/types/responses/tmdb/get-trending-movies';
import { GetUpcomingMoviesResponse } from '@/types/responses/tmdb/get-upcoming-movies';
import { SearchMovieResponse } from '@/types/responses/tmdb/search-movie';
import axios, { AxiosError, AxiosResponse, HttpStatusCode } from 'axios';

export class TmdbClient {
  static #instance: TmdbClient | undefined;

  private readonly apiKey: string = env.TMDB_API_KEY;
  private readonly accountId: string = env.TMDB_API_ACCOUNT_ID;
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

    return !response.error ? response.data.data : null;
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

    return !response.error ? response.data.data : null;
  }

  async getFavoriteMovies({
    sessionId,
    language = Language.EN,
    page = 1,
    sortBy = 'created_at.desc',
  }: {
    sessionId: string;
    language?: Language;
    page?: number;
    sortBy?: 'created_at.asc' | 'created_at.desc';
  }): Promise<GetFavoriteMoviesResponse | null> {
    const response = await tryCatch<AxiosResponse, AxiosError>(
      axios.get<GetFavoriteMoviesResponse>(`${this.baseUrl}/account/${this.accountId}/favorite/movies`, {
        params: {
          session_id: sessionId,
          language,
          page,
          sort_by: sortBy,
          api_key: this.apiKey,
        },
      }),
    );

    return !response.error ? response.data.data : null;
  }

  async addFavorite({
    sessionId,
    mediaType,
    mediaId,
    favorite,
  }: {
    sessionId: string;
    mediaType: 'movie' | 'tv';
    mediaId: number;
    favorite: boolean;
  }): Promise<AddFavoriteResponse | null> {
    const response = await tryCatch<AxiosResponse, AxiosError>(
      axios.post<AddFavoriteResponse>(
        `${this.baseUrl}/account/${this.accountId}/favorite`,
        {
          media_type: mediaType,
          media_id: mediaId,
          favorite,
        },
        {
          params: {
            session_id: sessionId,
            api_key: this.apiKey,
          },
        },
      ),
    );

    return !response.error ? response.data.data : null;
  }

  async getMoviesWatchlist({
    sessionId,
    language = Language.EN,
    page = 1,
    sortBy = 'created_at.desc',
  }: {
    sessionId: string;
    language?: Language;
    page?: number;
    sortBy?: 'created_at.asc' | 'created_at.desc';
  }): Promise<GetMoviesWatchlistResponse | null> {
    const response = await tryCatch<AxiosResponse, AxiosError>(
      axios.get<GetMoviesWatchlistResponse>(`${this.baseUrl}/account/${this.accountId}/watchlist/movies`, {
        params: {
          session_id: sessionId,
          language,
          page,
          sort_by: sortBy,
          api_key: this.apiKey,
        },
      }),
    );

    return !response.error ? response.data.data : null;
  }

  async addToWatchlist({
    sessionId,
    mediaType,
    mediaId,
    watchlist,
  }: {
    sessionId: string;
    mediaType: 'movie' | 'tv';
    mediaId: number;
    watchlist: boolean;
  }): Promise<AddToWatchlistResponse | null> {
    const response = await tryCatch<AxiosResponse, AxiosError>(
      axios.post<AddToWatchlistResponse>(
        `${this.baseUrl}/account/${this.accountId}/watchlist`,
        {
          media_type: mediaType,
          media_id: mediaId,
          watchlist,
        },
        {
          params: {
            session_id: sessionId,
            api_key: this.apiKey,
          },
        },
      ),
    );

    return !response.error ? response.data.data : null;
  }

  async getRatedMovies({
    sessionId,
    language = Language.EN,
    page = 1,
    sortBy = 'created_at.desc',
  }: {
    sessionId: string;
    language?: Language;
    page?: number;
    sortBy?: 'created_at.asc' | 'created_at.desc';
  }): Promise<GetRatedMoviesResponse | null> {
    const response = await tryCatch<AxiosResponse, AxiosError>(
      axios.get<GetRatedMoviesResponse>(`${this.baseUrl}/account/${this.accountId}/rated/movies`, {
        params: {
          session_id: sessionId,
          language,
          page,
          sort_by: sortBy,
          api_key: this.apiKey,
        },
      }),
    );

    return !response.error ? response.data.data : null;
  }

  async addMovieRating({
    sessionId,
    movieId,
    rating,
  }: {
    sessionId: string;
    movieId: number;
    rating: number;
  }): Promise<AddMovieRatingResponse | null> {
    const response = await tryCatch<AxiosResponse, AxiosError>(
      axios.post<AddMovieRatingResponse>(
        `${this.baseUrl}/movie/${movieId}/rating`,
        {
          value: rating,
        },
        {
          params: {
            session_id: sessionId,
            api_key: this.apiKey,
          },
        },
      ),
    );

    return !response.error ? response.data.data : null;
  }

  async deleteMovieRating({
    sessionId,
    movieId,
  }: {
    sessionId: string;
    movieId: number;
  }): Promise<DeleteMovieRatingResponse | null> {
    const response = await tryCatch<AxiosResponse, AxiosError>(
      axios.delete<DeleteMovieRatingResponse>(`${this.baseUrl}/movie/${movieId}/rating`, {
        params: {
          session_id: sessionId,
          api_key: this.apiKey,
        },
      }),
    );

    return !response.error ? response.data.data : null;
  }

  async searchMovie({
    query,
    primaryReleaseYear,
    region,
    year,
    includeAdult = true,
    language = Language.EN,
    page = 1,
  }: {
    query: string;
    primaryReleaseYear?: string;
    region?: string;
    year?: string;
    includeAdult?: boolean;
    language?: Language;
    page?: number;
  }): Promise<SearchMovieResponse | null> {
    const response = await tryCatch<AxiosResponse, AxiosError>(
      axios.get<SearchMovieResponse>(`${this.baseUrl}/search/movie`, {
        params: {
          query,
          primary_release_year: primaryReleaseYear,
          region,
          year,
          include_adult: includeAdult,
          language,
          page,
          api_key: this.apiKey,
        },
      }),
    );

    return !response.error ? response.data.data : null;
  }

  async getNowPlayingMovies({
    region,
    language = Language.EN,
    page = 1,
  }: {
    region?: string;
    language?: Language;
    page?: number;
  }): Promise<GetNowPlayingMoviesResponse | null> {
    const response = await tryCatch<AxiosResponse, AxiosError>(
      axios.get<GetNowPlayingMoviesResponse>(`${this.baseUrl}/movie/now_playing`, {
        params: {
          region,
          language,
          page,
          api_key: this.apiKey,
        },
      }),
    );

    return !response.error ? response.data.data : null;
  }

  async getPopularMovies({
    region,
    language = Language.EN,
    page = 1,
  }: {
    region?: string;
    language?: Language;
    page?: number;
  }): Promise<GetPopularMoviesResponse | null> {
    const response = await tryCatch<AxiosResponse, AxiosError>(
      axios.get<GetPopularMoviesResponse>(`${this.baseUrl}/movie/popular`, {
        params: {
          region,
          language,
          page,
          api_key: this.apiKey,
        },
      }),
    );

    return !response.error ? response.data.data : null;
  }

  async getUpcomingMovies({
    region,
    language = Language.EN,
    page = 1,
  }: {
    region?: string;
    language?: Language;
    page?: number;
  }): Promise<GetUpcomingMoviesResponse | null> {
    const response = await tryCatch<AxiosResponse, AxiosError>(
      axios.get<GetUpcomingMoviesResponse>(`${this.baseUrl}/movie/upcoming`, {
        params: {
          region,
          language,
          page,
          api_key: this.apiKey,
        },
      }),
    );

    return !response.error ? response.data.data : null;
  }

  async getTrendingMovies({
    timeWindow = 'day',
    language = Language.EN,
    page = 1,
  }: {
    timeWindow?: 'day' | 'week';
    language?: Language;
    page?: number;
  }): Promise<GetTrendingMoviesResponse | null> {
    const response = await tryCatch<AxiosResponse, AxiosError>(
      axios.get<GetTrendingMoviesResponse>(`${this.baseUrl}/trending/movie/${timeWindow}`, {
        params: {
          language,
          page,
          api_key: this.apiKey,
        },
      }),
    );

    return !response.error ? response.data.data : null;
  }

  async getMovieGenres({ language = Language.EN }: { language?: Language }): Promise<GetMovieGenresResponse | null> {
    const response = await tryCatch<AxiosResponse, AxiosError>(
      axios.get<GetMovieGenresResponse>(`${this.baseUrl}/genre/movie/list`, {
        params: {
          language,
          api_key: this.apiKey,
        },
      }),
    );

    return !response.error ? response.data.data : null;
  }
}
