import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { toast } from 'react-toastify';
import qs from 'qs';
import {
  User,
  Dog,
  DogsSearchResponse,
  Filter,
  Paginate,
  Location,
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
        toastId: err.response?.data,
        onClose() {
          setTimeout(() => {
            localStorage.clear();
            window.location.replace('/signin');
          }, 5000);
        },
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

  if (!nextQuery) {
    queryConfig = {
      params: {
        breeds: filter?.breeds.map((breed) => breed.value),
        zipCodes,
        sort: `${paginate?.sort?.by}:${paginate?.sort?.id}`,
        from: paginate?.from,
        size: 25,
      },
      // dping this as faced encoding issues.
      paramsSerializer: (params) => qs.stringify(params, { encode: false }),
    };
  }
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
