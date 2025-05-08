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
      title: 'moviesAndTVShows',
      description: 'stayOnTopOfAllYourMoviesAndTVShowsWhatYouVeSeeWhatYouAreWatchingAndWhatIsNextOnYourList',
    },
    {
      icon: TbTorii,
      title: 'animeAndManga',
      description:
        'organizeYourAnimeEpisodesAndMangaChaptersAcrossMultiplePlatformsWatchReadAndRememberWhereYouLeftOff',
    },
    {
      icon: TbBook2,
      title: 'books',
      description: 'trackYourReadingHistoryRateBooksAndKeepYourFutureReadingGoalsAllInOneTidyPlace',
    },
    {
      icon: TbDeviceGamepad2,
      title: 'games',
      description: 'fromSinglePlayerRPGsToMultiplayerBattlesLogPlaytimeMarkProgressAndTrackYourGameLibraryLikeAPro',
    },
  ],
  reviews: [
    {
      message:
        'omnilistHasCompletelyChangedHowIKeepTrackOfMyShowsAndMoviesWhatYouVeSeeWhatYouAreWatchingAndWhatIsNextOnYourList',
      author: 'Lolekowiec',
      title: 'movieEnthusiast',
    },
    {
      message: 'asAnAvidReaderILoveBeingAbleToTrackMyBooksAlongsideMyOtherMediaTheRatingSystemIsPerfect',
      author: 'Minio',
      title: 'bookLover',
    },
    {
      message: 'finallyAFinalPlaceWhereIKnowWhereIKeptMyAnimeAndGamesTogetherTheInterfaceIsCleanAndEasyToUse',
      author: 'Nokijoto',
      title: 'gamerAndAnimeFan',
    },
  ],
};
