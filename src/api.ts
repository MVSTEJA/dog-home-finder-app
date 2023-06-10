import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import qs from 'qs';

import { toast } from 'react-hot-toast';
import { ROUTE_CODES, URLs } from './constants';
import {
  AllDogsResponse,
  Dog,
  DogsSearchResponse,
  Filter,
  Location,
  Paginate,
  User,
} from './types';

const client = axios.create({
  baseURL: 'https://frontend-take-home-service.fetch.com',
  withCredentials: true,
});

client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.data === 'Unauthorized') {
      toast.error(`${err.response?.data} request, logging off`, {
        id: 'unauthorized',
        position: 'top-right',
      });
      setTimeout(() => {
        localStorage.removeItem('login');
        window.location.replace(ROUTE_CODES.HOME);
      }, 3000);
    }
  }
);

export async function createLogin(params: User): Promise<string> {
  const { data }: AxiosResponse = await client.post<string>(
    '/auth/login',
    params
  );
  return data;
}

export async function findAllDogs({
  nextQuery,
  filter,
  paginate = {
    from: 0,
    size: 0,
    sort: {
      name: '',
      id: '',
    },
  },
}: {
  nextQuery: string;
  filter?: Filter | undefined;
  paginate?: Paginate | undefined;
}): Promise<AllDogsResponse> {
  const locationQueryURL = URLs.fetchByLocations;
  // const locationQueryURL = URLs.searchDogs;
  let zipCodes = [];

  if (filter?.place) {
    const {
      data: { results: locations },
    }: AxiosResponse = await client.post<DogsSearchResponse>(locationQueryURL, {
      city: filter?.place.city,
      states: [filter?.place.state],
    });

    zipCodes = locations.map((lc: Location) => lc.zip_code);
  }

  // const dogSearchQueryURL = '/dogs/search';
  const dogSearchQueryURL = URLs.searchDogs;
  let queryConfig: AxiosRequestConfig = {};

  console.log({ nextQuery });
  const getFrom = (next: string, from?: number) => {
    if (next) {
      const { from: fromValue } = qs.parse(next);
      return {
        from: fromValue,
      };
    }
    return { from: (from || 0) * paginate.size };
  };
  const { from } = getFrom(nextQuery, paginate.from);

  queryConfig = {
    params: {
      breeds: filter?.breeds.map((breed) => breed.value),
      zipCodes,
      sort: `${paginate?.sort?.by}:${paginate?.sort?.id}`,
      from: from || 0,
      size: paginate.size,
    },
    // dping this as faced encoding issues.
    paramsSerializer: (params) => qs.stringify(params, { encode: false }),
  };

  const {
    data: { resultIds, next, prev, total },
  }: AxiosResponse = await client.get<DogsSearchResponse>(
    dogSearchQueryURL,
    queryConfig
  );
  const { data } = await client.post<Dog[]>(URLs.fetchDogData, resultIds);
  return {
    response: data,
    totalPages: total,
    next,
    prev,
  };
}

export async function findAllBreeds(filterValue: Filter): Promise<Filter> {
  const { data }: AxiosResponse<string[]> = await client.get<string[]>(
    URLs.fetchBreeds
  );

  return {
    ...filterValue,
    breeds: data.map((breed) => ({
      value: breed,
      label: breed,
    })),
  };
}

export async function findMatch(ids: string[]): Promise<Dog> {
  const { data: machtedData }: AxiosResponse = await client.post<Dog>(
    URLs.findMatch,
    ids
  );

  const { data } = await client.post<Dog[]>(URLs.fetchDogData, [
    machtedData.match,
  ]);
  return data[0];
}

export async function findLocations(): Promise<Location> {
  const { data }: AxiosResponse = await client.get<Location>(
    URLs.fetchLocations
  );
  return data;
}

export async function appLogOut() {
  await client.post<Location>(URLs.logout);
}
