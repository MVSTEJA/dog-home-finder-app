import { deepmerge } from '@mui/utils';
import { Dispatch, ReactNode, createContext, useReducer } from 'react';
import { Breed, Filter, Place } from 'src/types';

export interface FilterAction {
  type: string;
  breeds: Breed[];
  place: Place;
}

export const initialFilter = {
  breeds: [],
  place: {
    city: '',
    state: '',
    description: '',
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
    case 'clear': {
      return {
        ...deepmerge(filter.place, initialFilter.place, { clone: false }),
        ...filter,
        ...initialFilter,
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

interface PropsWithChildren {
  children: ReactNode;
}
export const FilterProvider = ({ children }: PropsWithChildren) => {
  const [filter, dispatch] = useReducer(filterReducer, initialFilter);

  return (
    <FilterContext.Provider value={filter}>
      <FilterDispatchContext.Provider value={dispatch}>
        {children}
      </FilterDispatchContext.Provider>
    </FilterContext.Provider>
  );
};
