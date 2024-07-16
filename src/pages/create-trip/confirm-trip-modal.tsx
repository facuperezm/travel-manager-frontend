import { Button } from '@/components/ui/button';
import { User, X } from 'lucide-react';
import { FormEvent } from 'react';

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void;
  setOwnerName: (name: string) => void;
  setOwnerEmail: (email: string) => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerEmail,
  setOwnerName,
}: ConfirmTripModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="shadow-shape w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Confirm your trip</h2>
            <button>
              <X
                className="size-5 text-zinc-400"
                onClick={closeConfirmTripModal}
              />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            To confirm a trip to
            <span className="font-semibold text-zinc-100"> New York </span> from
            <span className="font-semibold text-zinc-100">
              {' '}
              2022-12-01{' '}
            </span>{' '}
            please fill out the form below.
          </p>
        </div>

        <form onSubmit={createTrip} className="space-y-3">
          <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <User className="size-5 text-zinc-400" />
            <input
              type="text"
              name="name"
              placeholder="Your complete name"
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
              onChange={(event) => setOwnerName(event.target.value)}
            />
          </div>

          <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <User className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Your personal email"
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
              onChange={(event) => setOwnerEmail(event.target.value)}
            />
          </div>

          <Button type="submit">Confirm your trip</Button>
        </form>
      </div>
    </div>
  );
}
