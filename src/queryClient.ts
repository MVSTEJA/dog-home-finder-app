import { QueryClient } from '@tanstack/react-query';
// import { toast } from 'react-hot-toast';

export default new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false, // default: true
      refetchOnMount: false,
    },
  },
});
