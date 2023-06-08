export type User = {
  name: string;
  email: string;
};

export type Dog = {
  content: string;
  done?: boolean;
  id: string;
  img: string;
  name: string;
  age: number;
  breed: string;
  match: string;
  zip_code: string;
};

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
  sort: Sort;
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
