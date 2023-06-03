import { Dispatch, createContext, useContext, useReducer } from 'react';
import { Paginate } from '../types';

interface PaginateAction {
  type: string;
  id?: string;
  by?: string;
}
export const PaginateContext = createContext<Paginate>({
  size: 25,
  from: 0,
  fromCount: 1,
  sort: {
    name: '',
    id: '',
    by: '',
  },
});
export const PaginateDispatchContext = createContext<Dispatch<PaginateAction>>(
  () => null
);

const initialPaginate = {
  size: 25,
  from: 0,
  fromCount: 1,
  sort: {
    name: 'Ascending',
    id: 'asc',
    by: 'breed',
  },
};
// { name: 'Ascending', id: 'asc', by: 'breed' };

function paginateReducer(paginate: Paginate, action: PaginateAction): Paginate {
  switch (action.type) {
    case 'asc': {
      return {
        ...paginate,
        sort: {
          id: action.type,
          name: 'Ascending',
          by: action.by,
        },
      };
    }
    case 'desc': {
      return {
        ...paginate,
        sort: {
          ...paginate.sort,
          id: action.type,
          name: 'Descending',
          by: action.by,
        },
      };
    }
    case 'load_more': {
      return {
        ...paginate,
        fromCount: paginate.fromCount + 1,
        from: paginate.fromCount * 25,
      };
    }
    default: {
      return paginate;
    }
  }
}

export const PaginateProvider = ({ children }: React.PropsWithChildren) => {
  const [paginate, dispatch] = useReducer(paginateReducer, initialPaginate);

  return (
    <PaginateContext.Provider value={paginate}>
      <PaginateDispatchContext.Provider value={dispatch}>
        {children}
      </PaginateDispatchContext.Provider>
    </PaginateContext.Provider>
  );
};
