import axios, { AxiosResponse } from 'axios';

import { toast } from 'react-toastify';
import {
  User,
  Dog,
  DogsSearchResponse,
  AxiosError,
  Breed,
  Filter,
  Paginate,
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
  paginate,
}: {
  nextQuery: string;
  filter?: Filter | undefined;
  paginate?: Paginate | undefined;
}): Promise<AllDogsResponse> {
  const queryURL = nextQuery || '/dogs/search';
  let queryConfig = {};
  if (!nextQuery) {
    queryConfig = {
      params: {
        breeds: filter?.filterBreeds,
        sort: `${paginate?.sort?.by}:${paginate?.sort?.id}`,
        from: paginate?.from,
      },
    };
  }
  const {
    data: { resultIds, next, prev },
  }: AxiosResponse = await client.get<DogsSearchResponse>(
    queryURL,
    queryConfig
  );

  const { data } = await client.post<Dog[], AxiosError>('/dogs', resultIds);
  return {
    response: data,
    next,
    prev,
  };
}

export async function findAllBreeds(): Promise<Breed[]> {
  const { data }: AxiosResponse<string[]> = await client.get<string[]>(
    '/dogs/breeds'
  );

  return data.map((breed) => ({
    value: breed.toLowerCase(),
    label: breed,
  }));
}

export async function findMatch(ids: string[]): Promise<Dog> {
  const { data }: AxiosResponse = await client.post<Dog>('/dogs/match', ids);
  return data;
}

export async function findLocations(): Promise<Location> {
  const { data }: AxiosResponse = await client.get<Location>('/locations');
  return data;
}
