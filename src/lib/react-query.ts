import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      // onError(error) {
      //   if (isAxiosError(error)) {
      //     if ('message' in error.response?.data) {
      //       toast.error(error.response?.data.message);
      //     } else {
      //       toast.error('An error occurred. Please try again.');
      //     }
      //   }
      // },
    },
  },
});
