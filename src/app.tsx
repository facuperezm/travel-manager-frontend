import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CreateTripPage } from './pages/create-trip';
import { TripDetailsPage } from './pages/trip-details';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';

const router = createBrowserRouter([
  {
    path: '/',
    element: <CreateTripPage />,
  },
  {
    path: '/trips/:tripId',
    element: <TripDetailsPage />,
  },
]);

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative h-full w-full bg-background">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_14px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_10%,transparent_100%)]"></div>
        <RouterProvider router={router} />;
      </div>
    </QueryClientProvider>
  );
}
