import { Dispatch, ReactNode, createContext, useReducer } from 'react';
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

    default: {
      return paginate;
    }
  }
}

interface PropsWithChildren {
  children: ReactNode;
}
export const PaginateProvider = ({ children }: PropsWithChildren) => {
  const [paginate, dispatch] = useReducer(paginateReducer, initialPaginate);

  return (
    <PaginateContext.Provider value={paginate}>
      <PaginateDispatchContext.Provider value={dispatch}>
        {children}
      </PaginateDispatchContext.Provider>
    </PaginateContext.Provider>
  );
};
