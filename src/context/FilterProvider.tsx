import React, { Dispatch, createContext, useContext, useReducer } from 'react';
import { Filter } from '../types';

interface FilterAction {
  type: string;
  breeds: string[];
}

const initialFilter = {
  filterBreeds: [],
};

function filterReducer(filter: Filter, action: FilterAction): Filter {
  switch (action.type) {
    case 'add_breed': {
      return {
        ...filter,
        filterBreeds: action.breeds,
      };
    }

    default: {
      return filter;
    }
  }
}
export const FilterContext = createContext<Filter>({ filterBreeds: [] });
export const FilterDispatchContext = createContext<Dispatch<FilterAction>>(
  () => null
);

export function useFilter(): Filter {
  return useContext(FilterContext);
}

export function useFilterDispatch() {
  return useContext(FilterDispatchContext);
}

export const FilterProvider = ({ children }: React.PropsWithChildren) => {
  const [filter, dispatch] = useReducer(filterReducer, initialFilter);

  return (
    <FilterContext.Provider value={filter}>
      <FilterDispatchContext.Provider value={dispatch}>
        {children}
      </FilterDispatchContext.Provider>
    </FilterContext.Provider>
  );
};
