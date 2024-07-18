import { X } from 'lucide-react';
import { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface InviteParticipantsModalProps {
  closeGuestsModal: () => void;
  emailsToInvite: string[];
  addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void;
  removeEmailFromInvites: (email: string) => void;
}

export function InviteParticipants({
  closeGuestsModal,
  addNewEmailToInvite,
  emailsToInvite,
  removeEmailFromInvites,
}: InviteParticipantsModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="shadow-shape w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Invite participants</h2>
            <button>
              <X className="size-5 text-zinc-400" onClick={closeGuestsModal} />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            To invite people to the trip please fill out the form below with
            their email addresses.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {emailsToInvite.map((email) => {
            return (
              <div
                key={email}
                className="flex items-center gap-2 rounded-md bg-zinc-800 px-2.5 py-1.5"
              >
                <span className="text-sm text-zinc-300">{email}</span>
                <button type="button">
                  <X
                    onClick={() => removeEmailFromInvites(email)}
                    className="size-4 text-zinc-400"
                  />
                </button>
              </div>
            );
          })}
        </div>

        <form
          onSubmit={addNewEmailToInvite}
          className="flex items-center gap-2 "
        >
          <div className="flex flex-1 items-center gap-2">
            <Input
              type="email"
              name="email"
              placeholder="Email address to invite"
              className="flex-1 bg-transparent text-sm placeholder-zinc-400 outline-none"
            />
          </div>

          <Button type="submit">Invite</Button>
        </form>
      </div>
    </div>
  );
}
