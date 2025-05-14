import { Movie } from '@/types/responses/tmdb/movie';
import { SearchBarEntertainmentObjectCardProps } from '../_components/search-bar-entertainment-object-card';

export const transformSearchResponseMoviesToSearchBarEntertainmentObjectCardProps = (
  items: Movie[],
): SearchBarEntertainmentObjectCardProps[] => {
  return items.map(({ title, id, release_date, poster_path }) => {
    const releaseDate = new Date(release_date);
    const releaseYear = releaseDate.getFullYear();

    return {
      title,
      type: 'movie',
      href: `/movies/${id}`,
      releaseYear: releaseYear,
      imageUrl: poster_path,
    };
  });
};
