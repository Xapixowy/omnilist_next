import { IconType } from 'react-icons';
import { TbDeviceTv, TbMovie, TbSearch } from 'react-icons/tb';
import { MediaType } from '../_enums/media-type';
import { Filter } from '../_types/filter';

export const PAGE_CONFIG: {
  tabs: { name: string; icon: IconType; value: MediaType }[];
  filters: Record<MediaType, Filter[]>;
} = {
  tabs: [
    { name: 'all', icon: TbSearch, value: MediaType.ALL },
    { name: 'movies', icon: TbMovie, value: MediaType.MOVIE },
    { name: 'tv_shows', icon: TbDeviceTv, value: MediaType.TV_SHOW },
  ],
  filters: {
    [MediaType.ALL]: [
      {
        name: 'for_adults',
        filter: 'include_adult',
        type: 'checkbox',
        value: null,
      },
      {
        name: 'year',
        filter: 'year',
        type: 'input-number',
        min: 1900,
        max: new Date().getFullYear(),
        value: null,
      },
    ],
    [MediaType.MOVIE]: [
      {
        name: 'for_adults',
        filter: 'include_adult',
        type: 'checkbox',
        value: null,
      },
      {
        name: 'release_year',
        filter: 'year',
        type: 'input-number',
        min: 1900,
        max: new Date().getFullYear(),
        value: null,
      },
      {
        name: 'primary_release_year',
        filter: 'primary_release_year',
        type: 'input-number',
        min: 1900,
        max: new Date().getFullYear(),
        value: null,
      },
    ],
    [MediaType.TV_SHOW]: [
      {
        name: 'for_adults',
        filter: 'include_adult',
        type: 'checkbox',
        value: null,
      },
      {
        name: 'release_year',
        filter: 'year',
        type: 'slider',
        min: 1900,
        max: new Date().getFullYear(),
        step: 1,
        value: null,
      },
      {
        name: 'first_air_date_year',
        filter: 'first_air_date_year',
        type: 'slider',
        min: 1900,
        max: new Date().getFullYear(),
        step: 1,
        value: null,
      },
    ],
  },
};
