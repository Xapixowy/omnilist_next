import { Language } from '@/enums/language';
import { env } from '@/env';
import { tryCatch } from '@/functions/try-catch';
import { AddFavoriteResponse } from '@/types/responses/tmdb/add-favorite';
import { AddMovieRatingResponse } from '@/types/responses/tmdb/add-movie-rating';
import { AddToWatchlistResponse } from '@/types/responses/tmdb/add-to-watchlist';
import { AddTVShowRatingResponse } from '@/types/responses/tmdb/add-tv-show-rating';
import { CreateRequestTokenResponse } from '@/types/responses/tmdb/create-request-token';
import { CreateSessionResponse } from '@/types/responses/tmdb/create-session';
import { CreateSessionWithLoginResponse } from '@/types/responses/tmdb/create-session-with-login';
import { DeleteMovieRatingResponse } from '@/types/responses/tmdb/delete-movie-rating';
import { DeleteTVShowRatingResponse } from '@/types/responses/tmdb/delete-tv-show-rating';
import { EntertainmentObject } from '@/types/responses/tmdb/entertainment-object';
import { GetAiringTodayTVShowsResponse } from '@/types/responses/tmdb/get-airing-today-tv-shows';
import { GetFavoriteMoviesResponse } from '@/types/responses/tmdb/get-favorite-movies';
import { GetFavoriteTVShowsResponse } from '@/types/responses/tmdb/get-favorite-tv-shows';
import { GetMovieGenresResponse } from '@/types/responses/tmdb/get-movie-genres';
import { GetMoviesWatchlistResponse } from '@/types/responses/tmdb/get-movies-watchlist';
import { GetNowPlayingMoviesResponse } from '@/types/responses/tmdb/get-now-playing-movies';
import { GetOnTheAirTVShowsResponse } from '@/types/responses/tmdb/get-on-the-air-tv-shows';
import { GetPopularMoviesResponse } from '@/types/responses/tmdb/get-popular-movies';
import { GetPopularTVShowsResponse } from '@/types/responses/tmdb/get-popular-tv-shows';
import { GetRatedMoviesResponse } from '@/types/responses/tmdb/get-rated-movies';
import { GetRatedTVShowsResponse } from '@/types/responses/tmdb/get-rated-tv-shows';
import { GetTrendingMoviesResponse } from '@/types/responses/tmdb/get-trending-movies';
import { GetTrendingTVShowsResponse } from '@/types/responses/tmdb/get-trending-tv-shows';
import { GetTVShowGenresResponse } from '@/types/responses/tmdb/get-tv-show-genres';
import { GetTVShowsWatchlistResponse } from '@/types/responses/tmdb/get-tv-shows-watchlist';
import { GetUpcomingMoviesResponse } from '@/types/responses/tmdb/get-upcoming-movies';
import { SearchMovieResponse } from '@/types/responses/tmdb/search-movie';
import { SearchTVShowResponse } from '@/types/responses/tmdb/search-tv-show';
import axios, { AxiosError, AxiosResponse, HttpStatusCode } from 'axios';

export class TmdbClient {
  static #instance: TmdbClient | undefined;

  private readonly apiKey: string = env.TMDB_API_KEY;
  private readonly accountId: string = env.TMDB_API_ACCOUNT_ID;
  private readonly baseUrl: string = 'https://api.themoviedb.org/3';
  private readonly imageBaseUrl: string = 'https://image.tmdb.org/t/p';

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
    const response = await tryCatch<AxiosResponse<GetFavoriteMoviesResponse>, AxiosError>(
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

    if (response.error) {
      return null;
    }

    return {
      ...response.data.data,
      results: response.data.data.results.map((movie) => this.appendUrlToPaths(movie)),
    };
  }

  async getFavoriteTVShows({
    sessionId,
    language = Language.EN,
    page = 1,
    sortBy = 'created_at.desc',
  }: {
    sessionId: string;
    language?: Language;
    page?: number;
    sortBy?: 'created_at.asc' | 'created_at.desc';
  }): Promise<GetFavoriteTVShowsResponse | null> {
    const response = await tryCatch<AxiosResponse<GetFavoriteTVShowsResponse>, AxiosError>(
      axios.get<GetFavoriteTVShowsResponse>(`${this.baseUrl}/account/${this.accountId}/favorite/tv`, {
        params: {
          session_id: sessionId,
          language,
          page,
          sort_by: sortBy,
          api_key: this.apiKey,
        },
      }),
    );

    if (response.error) {
      return null;
    }

    return {
      ...response.data.data,
      results: response.data.data.results.map((tvShow) => this.appendUrlToPaths(tvShow)),
    };
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
    const response = await tryCatch<AxiosResponse<GetMoviesWatchlistResponse>, AxiosError>(
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

    if (response.error) {
      return null;
    }

    return {
      ...response.data.data,
      results: response.data.data.results.map((movie) => this.appendUrlToPaths(movie)),
    };
  }

  async getTVShowsWatchlist({
    sessionId,
    language = Language.EN,
    page = 1,
    sortBy = 'created_at.desc',
  }: {
    sessionId: string;
    language?: Language;
    page?: number;
    sortBy?: 'created_at.asc' | 'created_at.desc';
  }): Promise<GetTVShowsWatchlistResponse | null> {
    const response = await tryCatch<AxiosResponse<GetTVShowsWatchlistResponse>, AxiosError>(
      axios.get<GetTVShowsWatchlistResponse>(`${this.baseUrl}/account/${this.accountId}/watchlist/tv`, {
        params: {
          session_id: sessionId,
          language,
          page,
          sort_by: sortBy,
          api_key: this.apiKey,
        },
      }),
    );

    if (response.error) {
      return null;
    }

    return {
      ...response.data.data,
      results: response.data.data.results.map((tvShow) => this.appendUrlToPaths(tvShow)),
    };
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
    const response = await tryCatch<AxiosResponse<GetRatedMoviesResponse>, AxiosError>(
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

    if (response.error) {
      return null;
    }

    return {
      ...response.data.data,
      results: response.data.data.results.map((movie) => this.appendUrlToPaths(movie)),
    };
  }

  async getRatedTVShows({
    sessionId,
    language = Language.EN,
    page = 1,
    sortBy = 'created_at.desc',
  }: {
    sessionId: string;
    language?: Language;
    page?: number;
    sortBy?: 'created_at.asc' | 'created_at.desc';
  }): Promise<GetRatedTVShowsResponse | null> {
    const response = await tryCatch<AxiosResponse<GetRatedTVShowsResponse>, AxiosError>(
      axios.get<GetRatedTVShowsResponse>(`${this.baseUrl}/account/${this.accountId}/rated/tv`, {
        params: {
          session_id: sessionId,
          language,
          page,
          sort_by: sortBy,
          api_key: this.apiKey,
        },
      }),
    );

    if (response.error) {
      return null;
    }

    return {
      ...response.data.data,
      results: response.data.data.results.map((tvShow) => this.appendUrlToPaths(tvShow)),
    };
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

  async addTVShowRating({
    sessionId,
    tvShowId,
    rating,
  }: {
    sessionId: string;
    tvShowId: number;
    rating: number;
  }): Promise<AddTVShowRatingResponse | null> {
    const response = await tryCatch<AxiosResponse, AxiosError>(
      axios.post<AddTVShowRatingResponse>(
        `${this.baseUrl}/tv/${tvShowId}/rating`,
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

  async deleteTVShowRating({
    sessionId,
    tvShowId,
  }: {
    sessionId: string;
    tvShowId: number;
  }): Promise<DeleteTVShowRatingResponse | null> {
    const response = await tryCatch<AxiosResponse, AxiosError>(
      axios.delete<DeleteTVShowRatingResponse>(`${this.baseUrl}/tv/${tvShowId}/rating`, {
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
    const response = await tryCatch<AxiosResponse<SearchMovieResponse>, AxiosError>(
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

    if (response.error) {
      return null;
    }

    return {
      ...response.data.data,
      results: response.data.data.results.map((movie) => this.appendUrlToPaths(movie)),
    };
  }

  async searchTVShow({
    query,
    firstAirDateYear,
    year,
    includeAdult = true,
    language = Language.EN,
    page = 1,
  }: {
    query: string;
    firstAirDateYear?: number;
    year?: number;
    includeAdult?: boolean;
    language?: Language;
    page?: number;
  }): Promise<SearchTVShowResponse | null> {
    const response = await tryCatch<AxiosResponse<SearchTVShowResponse>, AxiosError>(
      axios.get<SearchTVShowResponse>(`${this.baseUrl}/search/tv`, {
        params: {
          query,
          first_air_date_year: firstAirDateYear,
          year,
          include_adult: includeAdult,
          language,
          page,
          api_key: this.apiKey,
        },
      }),
    );

    if (response.error) {
      return null;
    }

    return {
      ...response.data.data,
      results: response.data.data.results.map((tvShow) => this.appendUrlToPaths(tvShow)),
    };
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
    const response = await tryCatch<AxiosResponse<GetNowPlayingMoviesResponse>, AxiosError>(
      axios.get<GetNowPlayingMoviesResponse>(`${this.baseUrl}/movie/now_playing`, {
        params: {
          region,
          language,
          page,
          api_key: this.apiKey,
        },
      }),
    );

    if (response.error) {
      return null;
    }

    return {
      ...response.data.data,
      results: response.data.data.results.map((movie) => this.appendUrlToPaths(movie)),
    };
  }

  async getAiringTodayTVShows({
    timezone,
    language = Language.EN,
    page = 1,
  }: {
    timezone?: string;
    language?: Language;
    page?: number;
  }): Promise<GetAiringTodayTVShowsResponse | null> {
    const response = await tryCatch<AxiosResponse<GetAiringTodayTVShowsResponse>, AxiosError>(
      axios.get<GetAiringTodayTVShowsResponse>(`${this.baseUrl}/tv/airing_today`, {
        params: {
          timezone,
          language,
          page,
          api_key: this.apiKey,
        },
      }),
    );

    if (response.error) {
      return null;
    }

    return {
      ...response.data.data,
      results: response.data.data.results.map((tvShow) => this.appendUrlToPaths(tvShow)),
    };
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
    const response = await tryCatch<AxiosResponse<GetPopularMoviesResponse>, AxiosError>(
      axios.get<GetPopularMoviesResponse>(`${this.baseUrl}/movie/popular`, {
        params: {
          region,
          language,
          page,
          api_key: this.apiKey,
        },
      }),
    );

    if (response.error) {
      return null;
    }

    return {
      ...response.data.data,
      results: response.data.data.results.map((movie) => this.appendUrlToPaths(movie)),
    };
  }

  async getPopularTVShows({
    language = Language.EN,
    page = 1,
  }: {
    language?: Language;
    page?: number;
  }): Promise<GetPopularTVShowsResponse | null> {
    const response = await tryCatch<AxiosResponse<GetPopularTVShowsResponse>, AxiosError>(
      axios.get<GetPopularTVShowsResponse>(`${this.baseUrl}/tv/popular`, {
        params: {
          language,
          page,
          api_key: this.apiKey,
        },
      }),
    );

    if (response.error) {
      return null;
    }

    return {
      ...response.data.data,
      results: response.data.data.results.map((tvShow) => this.appendUrlToPaths(tvShow)),
    };
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
    const response = await tryCatch<AxiosResponse<GetUpcomingMoviesResponse>, AxiosError>(
      axios.get<GetUpcomingMoviesResponse>(`${this.baseUrl}/movie/upcoming`, {
        params: {
          region,
          language,
          page,
          api_key: this.apiKey,
        },
      }),
    );

    if (response.error) {
      return null;
    }

    return {
      ...response.data.data,
      results: response.data.data.results.map((movie) => this.appendUrlToPaths(movie)),
    };
  }

  async getOnTheAirTVShows({
    timezone,
    language = Language.EN,
    page = 1,
  }: {
    timezone?: string;
    language?: Language;
    page?: number;
  }): Promise<GetOnTheAirTVShowsResponse | null> {
    const response = await tryCatch<AxiosResponse<GetOnTheAirTVShowsResponse>, AxiosError>(
      axios.get<GetOnTheAirTVShowsResponse>(`${this.baseUrl}/tv/on_the_air`, {
        params: {
          timezone,
          language,
          page,
          api_key: this.apiKey,
        },
      }),
    );

    if (response.error) {
      return null;
    }

    return {
      ...response.data.data,
      results: response.data.data.results.map((tvShow) => this.appendUrlToPaths(tvShow)),
    };
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
    const response = await tryCatch<AxiosResponse<GetTrendingMoviesResponse>, AxiosError>(
      axios.get<GetTrendingMoviesResponse>(`${this.baseUrl}/trending/movie/${timeWindow}`, {
        params: {
          language,
          page,
          api_key: this.apiKey,
        },
      }),
    );

    if (response.error) {
      return null;
    }

    return {
      ...response.data.data,
      results: response.data.data.results.map((movie) => this.appendUrlToPaths(movie)),
    };
  }

  async getTrendingTVShows({
    timeWindow = 'day',
    language = Language.EN,
    page = 1,
  }: {
    timeWindow?: 'day' | 'week';
    language?: Language;
    page?: number;
  }): Promise<GetTrendingTVShowsResponse | null> {
    const response = await tryCatch<AxiosResponse<GetTrendingTVShowsResponse>, AxiosError>(
      axios.get<GetTrendingTVShowsResponse>(`${this.baseUrl}/trending/tv/${timeWindow}`, {
        params: {
          language,
          api_key: this.apiKey,
          page,
        },
      }),
    );

    if (response.error) {
      return null;
    }

    return {
      ...response.data.data,
      results: response.data.data.results.map((tvShow) => this.appendUrlToPaths(tvShow)),
    };
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

  async getTVShowGenres({ language = Language.EN }: { language?: Language }): Promise<GetTVShowGenresResponse | null> {
    const response = await tryCatch<AxiosResponse, AxiosError>(
      axios.get<GetTVShowGenresResponse>(`${this.baseUrl}/genre/tv/list`, {
        params: {
          language,
          api_key: this.apiKey,
        },
      }),
    );

    return !response.error ? response.data.data : null;
  }

  private appendUrlToPaths<T extends EntertainmentObject>(
    object: T,
    options: {
      backdropSize?: 'w300' | 'w780' | 'w1280' | 'original';
      posterSize?: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original';
    } = {
      backdropSize: 'w1280',
      posterSize: 'w342',
    },
  ): T {
    const { backdrop_path, poster_path } = object;
    const { backdropSize, posterSize } = options;

    const backdropUrl = backdrop_path ? `${this.imageBaseUrl}/${backdropSize}${backdrop_path}` : undefined;
    const posterUrl = backdrop_path ? `${this.imageBaseUrl}/${posterSize}${poster_path}` : undefined;

    return {
      ...object,
      backdrop_path: backdropUrl,
      poster_path: posterUrl,
    };
  }
}
