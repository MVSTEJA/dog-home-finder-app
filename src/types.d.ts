import * as z from 'zod';

const DogObj = z.object({
  content: z.string().min(1).optional,
  done: z.boolean().optional,
  id: z.string(),
  img: z.string().optional,
  name: z.string().optional,
  age: z.number().optional,
  zipCode: z.string().optional,
  breed: z.string().optional,
});

const userMeta = z.object({
  name: z.string(),
  email: z.string(),
});

export type User = z.infer<typeof userMeta>;

export type Dog = z.infer<typeof DogObj>;
export type DogWithId = WithId<DogObj>;

export type DogsSearchResponse = {
  resultIds: string[];
  total: number;
  next: string;
  prev: string;
};
export type DogsSearchFilter = {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sort?: string;
};

export interface MessageResponse {
  message: string;
}

export interface ErrorResponse extends MessageResponse {
  stack?: string;
}

export type AxiosError = AxiosError<ErrorResponse>;

interface Breed {
  value: string;
  label: string;
}

interface Sort {
  name: string;
  id: string;
  by?: string;
}
interface Paginate {
  fromCount?: number;
  size?: number;
  from?: number;
  sort?: Sort;
}

interface Filter {
  breeds: Breed[];
  place: Place;
}

interface Place {
  city: string;
  state: string;
  description?: string;
}

interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}
