import { BasePaginatedResponse } from './base-paginated-response';
import { Movie } from './movie';

export type SearchMovieResponse = BasePaginatedResponse<Movie>;
