import { GetMovieGenresResponse } from '@/types/responses/tmdb/get-movie-genres';
import { BaseResponse } from '../../base-response';

export type GenresResponse = BaseResponse<GetMovieGenresResponse>;
