import { Genre } from '@/types/responses/tmdb/genre';
import { Movie } from '@/types/responses/tmdb/movie';
import { TVShow } from '@/types/responses/tmdb/tv-show';
import { SearchBarEntertainmentObjectCardProps } from '../_components/search-bar-entertainment-object-card';

export const transformSearchResponseMoviesToSearchBarEntertainmentObjectCardProps = ({
  items,
  genres,
}: {
  items: Movie[];
  genres: Genre[];
}): SearchBarEntertainmentObjectCardProps[] =>
  items.map(({ title, id, release_date, poster_path, genre_ids, popularity }) => {
    const releaseYear = release_date ? new Date(release_date).getFullYear() : null;
    const genreNames = genre_ids
      .map((id) => {
        const genre = genres.find((genre) => genre.id === id);
        return genre?.name ?? null;
      })
      .filter((genre) => genre !== null);

    return {
      title,
      type: 'movie',
      href: `/movies/${id}`,
      releaseYear: releaseYear,
      imageUrl: poster_path,
      genres: genreNames,
      popularity,
    };
  });

export const transformSearchResponseTVShowsToSearchBarEntertainmentObjectCardProps = ({
  items,
  genres,
}: {
  items: TVShow[];
  genres: Genre[];
}): SearchBarEntertainmentObjectCardProps[] =>
  items.map(({ name, id, first_air_date, poster_path, genre_ids, popularity }) => {
    const releaseYear = first_air_date ? new Date(first_air_date).getFullYear() : null;
    const genreNames = genre_ids
      .map((id) => {
        const genre = genres.find((genre) => genre.id === id);
        return genre?.name ?? null;
      })
      .filter((genre) => genre !== null);

    return {
      title: name,
      type: 'tv_show',
      href: `/tv-shows/${id}`,
      releaseYear: releaseYear,
      imageUrl: poster_path,
      genres: genreNames,
      popularity,
    };
  });
