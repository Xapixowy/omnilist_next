import { SearchMovieResponse } from '@/types/responses/tmdb/search-movie';
import { BaseResponse } from '../../base-response';

export type SearchResponse = BaseResponse<SearchMovieResponse>;
