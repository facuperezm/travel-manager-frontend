import { Home, LogOut, Plane, Ticket } from 'lucide-react';

import { Separator } from './ui/separator';
import { NavLink } from './nav-link';
import { Button } from './ui/button';

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Plane className="h-6 w-6" />
        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home className="h-4 w-4" />
            Home
          </NavLink>
          <NavLink to="/orders">
            <Ticket className="h-4 w-4" />
            Trips
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center space-x-2">
          <Button>
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
