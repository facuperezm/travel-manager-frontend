import { Plane } from 'lucide-react';
import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="container relative hidden min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col border-r border-foreground/5 bg-muted p-10 text-muted-foreground dark:border-r lg:flex">
        <div className="flex items-center gap-3 text-lg font-medium text-foreground">
          <Plane />
          <span className="font-semibold">Travel Manager App</span>
        </div>
        <div className="mt-auto">
          <footer className="text-sm">
            Travel manager &copy; Facundo Perez Montalvo -{' '}
            {new Date().getFullYear()}
          </footer>
        </div>
      </div>

      <div className="relative flex min-h-screen flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
