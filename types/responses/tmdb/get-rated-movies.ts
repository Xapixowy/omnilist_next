import { BasePaginatedResponse } from './base-paginated-response';
import { Movie } from './movie';

export type GetRatedMoviesResponse = BasePaginatedResponse<Movie>;
