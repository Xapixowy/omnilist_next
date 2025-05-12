import { EntertainmentObject } from './entertainment-object';

export type Movie = EntertainmentObject & {
  original_title: string;
  release_date: string;
  title: string;
  video: boolean;
};
