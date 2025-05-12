import { EntertainmentObject } from './entertainment-object';

export type TVShow = EntertainmentObject & {
  origin_country: string[];
  original_name: string;
  first_air_date: string;
  name: string;
};
