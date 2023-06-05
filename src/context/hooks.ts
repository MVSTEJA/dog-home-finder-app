import { useContext } from 'react';
import { Filter, Paginate } from 'src/types';
import { FilterContext, FilterDispatchContext } from './FilterProvider';
import { PaginateContext, PaginateDispatchContext } from './PaginateProvider';

export function useFilter(): Filter {
  return useContext(FilterContext);
}

export function useFilterDispatch() {
  return useContext(FilterDispatchContext);
}

export function usePaginate(): Paginate {
  return useContext(PaginateContext);
}

export function usePaginateDispatch() {
  return useContext(PaginateDispatchContext);
}
