import { TbBook2, TbDeviceGamepad2, TbDeviceTvOld, TbTorii } from 'react-icons/tb';
import { AdvantageProps } from '../_components/page/advantage';
import { ReviewProps } from '../_components/page/review';

export const PAGE_CONFIG: {
  advantages: AdvantageProps[];
  reviews: ReviewProps[];
} = {
  advantages: [
    {
      icon: TbDeviceTvOld,
      title: 'movies_and_tv_shows',
      description:
        'stay_on_top_of_all_your_movies_and_tv_shows_what_you_ve_see_what_you_are_watching_and_what_is_next_on_your_list',
    },
    {
      icon: TbTorii,
      title: 'anime_and_manga',
      description:
        'organize_your_anime_episodes_and_manga_chapters_across_multiple_platforms_watch_read_and_remember_where_you_left_off',
    },
    {
      icon: TbBook2,
      title: 'books',
      description: 'track_your_reading_history_rate_books_and_keep_your_future_reading_goals_all_in_one_tidy_place',
    },
    {
      icon: TbDeviceGamepad2,
      title: 'games',
      description:
        'from_single_player_rpgs_to_multiplayer_battles_log_playtime_mark_progress_and_track_your_game_library_like_a_pro',
    },
  ],
  reviews: [
    {
      message:
        'app_has_completely_changed_how_i_keep_track_of_my_shows_and_movies_what_you_ve_see_what_you_are_watching_and_what_is_next_on_your_list',
      author: 'Lolekowiec',
      title: 'movie_enthusiast',
    },
    {
      message:
        'as_an_avid_reader_i_love_being_able_to_track_my_books_alongside_my_other_media_the_rating_system_is_perfect',

      author: 'Minio',
      title: 'book_lover',
    },
    {
      message: 'finally_a_place_where_i_can_track_my_anime_and_games_together_the_interface_is_clean_and_easy_to_use',
      author: 'Nokijoto',
      title: 'gamer_and_anime_fan',
    },
  ],
};
