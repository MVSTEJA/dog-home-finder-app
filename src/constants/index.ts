export const PUBLIC_PATH = '/';
export const ROUTE_CODES = {
  HOME: `${PUBLIC_PATH}home`,
  SIGNIN: PUBLIC_PATH,
};

export const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';
export const MOBILE_WIDTH_QUERY = '(min-width:600px)';

export const PAGE_SIZE = 9;
export const PAGE_SIZE_SEARCH = 25;

export const URLs = {
  login: '/auth/login',
  logout: '/auth/logout',
  searchDogs: '/dogs/search',
  fetchDogData: '/dogs',
  fetchBreeds: '/dogs/breeds',
  findMatch: '/dogs/match',
  fetchByLocations: '/locations/search',
  fetchLocations: '/locations',
};
