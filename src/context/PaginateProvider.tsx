import { Dispatch, ReactNode, createContext, useReducer } from 'react';
import { PAGE_SIZE } from 'src/constants';
import { Paginate } from 'src/types';
import { getURLParams } from 'src/utils/url-params';

interface PaginateAction {
  size?: number;
  from?: number;
  fromCount?: number;
  type: string;
  id?: string;
  by?: string;
}

export const initialPaginate = {
  size: PAGE_SIZE,
  from: Number(getURLParams('page')) || 0,
  fromCount: 1,
  sort: {
    name: getURLParams('sortId') || 'breed',
    id: getURLParams('sortId') || 'asc',
    by: getURLParams('sortBy') || 'breed',
  },
};

export const PaginateDispatchContext = createContext<Dispatch<PaginateAction>>(
  () => null
);

export const PaginateContext = createContext<Paginate>(initialPaginate);

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
    case 'next_page': {
      return {
        ...paginate,
        from: action.from,
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
