import { Button } from '@/components/ui/button';
import { DatePickerWithRange } from './date-range-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function CreateTripPage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-6">
      <header className="space-y-4">
        <h1 className="text-center text-2xl">Welcome to travel manager app!</h1>
        <h2 className="leading-tight">
          Create a trip by filling out the form below and clicking the "Create
          Trip" button.
        </h2>
      </header>
      <article>
        <form className="flex gap-2">
          <Label htmlFor="where">
            <Input id="where" placeholder="Where are you going?" />
          </Label>
          <Label htmlFor="when">
            <DatePickerWithRange />
          </Label>
          <Button type="submit">Create Trip</Button>
        </form>
      </article>
    </main>
  );
}
