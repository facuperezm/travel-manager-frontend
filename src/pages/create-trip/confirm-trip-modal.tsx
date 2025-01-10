import { Input } from '@/components/ui/input';
import { format } from 'date-fns/format';
import { AtSign, User, X } from 'lucide-react';
import { FormEvent } from 'react';
import { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void;
  setOwnerName: (name: string) => void;
  isPending: boolean;
  setOwnerEmail: (email: string) => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  destination: string;
  eventStartAndEndDates: DateRange | undefined;
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  isPending,
  setOwnerEmail,
  setOwnerName,
  destination,
  eventStartAndEndDates,
}: ConfirmTripModalProps) {
  const from = format(
    eventStartAndEndDates?.from?.toString() || new Date(),
    'LLLL dd'
  );

  const to = format(
    eventStartAndEndDates?.to?.toString() || new Date(),
    'LLLL dd'
  );
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="shadow-shape w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Confirm your trip</h2>
            <Button variant="ghost" size="icon" onClick={closeConfirmTripModal}>
              <X className="size-5 text-zinc-400" />
            </Button>
          </div>

          <p className="text-sm text-zinc-400">
            To confirm a trip to
            <span className="font-semibold text-zinc-100"> {destination} </span>
            from
            <span className="font-semibold text-zinc-100"> {from} </span>
            to
            <span className="font-semibold text-zinc-100"> {to} </span>
            please fill out the form below.
          </p>
        </div>

        <form onSubmit={createTrip} className="w-full space-y-3">
          <div className="flex items-center gap-2">
            <User className="size-5 text-zinc-400" />
            <Input
              type="text"
              name="name"
              placeholder="Your complete name"
              className="flex-1 bg-transparent text-sm"
              disabled={isPending}
              onChange={(event) => setOwnerName(event.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <AtSign className="size-5 text-zinc-400" />
            <Input
              type="email"
              name="email"
              placeholder="Your personal email"
              className="flex-1 bg-transparent text-sm"
              disabled={isPending}
              onChange={(event) => setOwnerEmail(event.target.value)}
            />
          </div>

          <Button type="submit" className="ml-auto" disabled={isPending}>
            {isPending ? 'Creating...' : 'Confirm your trip'}
          </Button>
        </form>
      </div>
    </div>
  );
}
