import { deepmerge } from '@mui/utils';
import { Dispatch, ReactNode, createContext, useReducer } from 'react';
import { Breed, Filter, Place } from 'src/types';
import { convertToArray, getURLParams } from 'src/utils/url-params';

export interface FilterAction {
  type: string;
  breeds: Breed[];
  place: Place;
}

const initialBreeds = getURLParams('breeds');
export const initialFilter = {
  breeds: initialBreeds
    ? convertToArray(initialBreeds)?.map((x) => ({
        value: x,
        label: x,
      }))
    : [],
  place: {
    city: getURLParams('city') || '',
    state: getURLParams('state') || '',
    description: getURLParams('description') || '',
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
