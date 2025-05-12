import { BasePaginatedResponse } from './base-paginated-response';
import { Movie } from './movie';

export type GetPopularMoviesResponse = BasePaginatedResponse<Movie>;
