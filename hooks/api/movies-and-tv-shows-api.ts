import { REACT_QUERY_CONFIG } from '@/configs/react-query';
import { SearchResponse as SearchMovieResponse } from '@/types/api/movies-and-tv-shows/movies/search';
import { SearchResponse as SearchTVShowResponse } from '@/types/api/movies-and-tv-shows/tv-shows/search';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const MOVIES_AND_TV_SHOWS_API = {
  movies: {
    useSearch: (query: string, includeAdult: boolean = true) =>
      useQuery({
        queryKey: ['movies-and-tv-shows', 'movies', 'search', query, includeAdult],
        queryFn: async () => {
          const res = await axios.get<SearchMovieResponse>('/api/movies-and-tv-shows/movies/search', {
            params: { query },
          });
          return res.data;
        },
        enabled: !!query,
        staleTime: REACT_QUERY_CONFIG.cacheTime,
      }),
  },
  tvShows: {
    useSearch: (query: string, includeAdult: boolean = true) =>
      useQuery({
        queryKey: ['movies-and-tv-shows', 'tv-shows', 'search', query, includeAdult],
        queryFn: async () => {
          const res = await axios.get<SearchTVShowResponse>('/api/movies-and-tv-shows/tv-shows/search', {
            params: { query },
          });
          return res.data;
        },
        enabled: !!query,
        staleTime: REACT_QUERY_CONFIG.cacheTime,
      }),
  },
};
