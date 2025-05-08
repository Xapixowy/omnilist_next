export const ROUTES_CONFIG = {
  default: '/',

  uiTester: 'ui-tester',

  about: 'about',
  aboutRoutes: {
    dependencies: 'dependencies',
  },

  auth: 'auth',
  authRoutes: {
    login: 'login',
    register: 'register',
    verifyEmail: 'verify-email',
    forgotPassword: 'forgot-password',
    resetPassword: 'reset-password',
  },

  profile: 'profile',
  list: 'list',
  listRoutes: {
    moviesAndTvShows: 'movies-and-tv-shows',
  },
} as const;
