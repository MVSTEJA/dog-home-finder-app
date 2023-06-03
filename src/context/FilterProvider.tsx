import React, { Dispatch, createContext, useContext, useReducer } from 'react';
import { Breed, Filter, Place } from '../types';

export interface FilterAction {
  type: string;
  breeds: Breed[];
  place: Place;
}

const initialFilter = {
  breeds: [],
  place: {
    city: '',
    state: '',
  },
};

function filterReducer(filter: Filter, action: FilterAction): Filter {
  switch (action.type) {
    case 'mutate': {
      return {
        ...filter,
        breeds: action.breeds,
        place: action.place,
      };
    }

    default: {
      return filter;
    }
  }
}
export const FilterContext = createContext<Filter>(initialFilter);
export const FilterDispatchContext = createContext<Dispatch<FilterAction>>(
  () => null
);

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
