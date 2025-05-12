import { BasePaginatedResponse } from './base-paginated-response';
import { Movie } from './movie';

export type GetNowPlayingMoviesResponse = BasePaginatedResponse<Movie> & {
  dates: {
    maximum: string;
    minimum: string;
  };
};
