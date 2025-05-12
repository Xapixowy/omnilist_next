import { BasePaginatedResponse } from './base-paginated-response';
import { Movie } from './movie';

export type GetFavoriteMoviesResponse = BasePaginatedResponse<Movie>;
