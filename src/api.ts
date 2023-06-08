import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import qs from 'qs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {
  User,
  Dog,
  DogsSearchResponse,
  Filter,
  Paginate,
  Location,
} from './types';
import { ROUTE_CODES } from './constants';

const client = axios.create({
  baseURL: 'https://frontend-take-home-service.fetch.com',
  withCredentials: true,
});

client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.data === 'Unauthorized') {
      Swal.fire({
        icon: 'error',
        text: `${err.response?.data} request, logging off`,
        target: '#custom-target',
        customClass: {
          container: 'position-absolute',
        },
        toast: true,
        position: 'top-right',
      }).then(() => {
        setTimeout(() => {
          localStorage.removeItem('login');
          window.location.replace(ROUTE_CODES.HOME);
        }, 3000);
      });
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

export interface AllDogsResponse {
  response: Dog[];
  next: string;
  prev: string;
}

export async function findAllDogs({
  nextQuery,
  filter,
  paginate = {
    from: 0,
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
  const locationQueryURL = '/locations/search';
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

  const dogSearchQueryURL = '/dogs/search';
  let queryConfig: AxiosRequestConfig = {};

  const { from } = qs.parse(nextQuery);

  queryConfig = {
    params: {
      breeds: filter?.breeds.map((breed) => breed.value),
      zipCodes,
      sort: `${paginate?.sort?.by}:${paginate?.sort?.id}`,
      from: from || 0,
      size: 25,
    },
    // dping this as faced encoding issues.
    paramsSerializer: (params) => qs.stringify(params, { encode: false }),
  };

  const {
    data: { resultIds, next, prev },
  }: AxiosResponse = await client.get<DogsSearchResponse>(
    dogSearchQueryURL,
    queryConfig
  );
  const { data } = await client.post<Dog[]>('/dogs', resultIds);
  return {
    response: data,
    next,
    prev,
  };
}

export async function findAllBreeds(filterValue: Filter): Promise<Filter> {
  const { data }: AxiosResponse<string[]> = await client.get<string[]>(
    '/dogs/breeds'
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
  const { data }: AxiosResponse = await client.post<Dog>('/dogs/match', ids);
  return data;
}

export async function findLocations(): Promise<Location> {
  const { data }: AxiosResponse = await client.get<Location>('/locations');
  return data;
}

export async function appLogOut() {
  await client.post<Location>('/auth/logout');
}
