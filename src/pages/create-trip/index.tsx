import { createTrip } from '@/api/create-trip';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMutation } from '@tanstack/react-query';
import { addDays } from 'date-fns';
import React, { FormEvent } from 'react';
import { DateRange } from 'react-day-picker';
import { DatePickerWithRange } from './date-range-picker';
import { InviteParticipants } from './invite-participants';
import { ArrowRight, Settings2, UserRoundPlus } from 'lucide-react';
import { ConfirmTripModal } from './confirm-trip-modal';

export function CreateTripPage() {
  const [eventStartAndEndDates, setEventStartAndEndDates] = React.useState<
    DateRange | undefined
  >({
    from: new Date(),
    to: addDays(new Date(), 2),
  });
  const [destination, setDestination] = React.useState('');
  const [ownerName, setOwnerName] = React.useState('');
  const [ownerEmail, setOwnerEmail] = React.useState('');

  const [emailsToInvite, setEmailsToInvite] = React.useState(['facu@test.com']);
  const [showModal, setShowModal] = React.useState(false);
  const [showSecondModal, setShowSecondModal] = React.useState(false);
  const [isGuestsInputOpen, setIsGuestsInputOpen] = React.useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = React.useState(false);

  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString();

    if (!email) {
      return;
    }

    if (emailsToInvite.includes(email)) {
      return;
    }

    setEmailsToInvite([...emailsToInvite, email]);

    event.currentTarget.reset();
  }

  const { mutateAsync } = useMutation({
    mutationFn: createTrip,
  });

  async function startTrip() {
    await mutateAsync({
      destination: 'Bariloche',
      starts_at: date?.from!.toISOString() ?? '',
      ends_at: date?.to!.toISOString() ?? '',
      owner_name: 'pepe',
      owner_email: 'argento@pepe.com',
      emails_to_invite: ['pepito@pepe.com', 'pepe@pepe.com'],
    });
  }

  function openConfirmTripModal() {
    setShowModal(true);
  }

  function closeConfirmTripModal() {
    setShowModal(false);
  }

  function closeGuestModal() {
    setIsGuestsInputOpen(false);
  }

  function openGuestModal() {
    setIsGuestsInputOpen(true);
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-6 px-4">
      <header className="space-y-4">
        <h1 className="text-center text-2xl">Welcome to travel manager app!</h1>
        <h2 className="text-center leading-tight">
          Create a trip by filling out the form below and clicking the "Create
          Trip" button.
        </h2>
      </header>
      <article>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Label htmlFor="where" className="flex-1">
              <Input
                id="where"
                placeholder="Where are you going?"
                onChange={(event) => setDestination(event.target.value)}
              />
            </Label>
            <Label htmlFor="when">
              <DatePickerWithRange
                date={eventStartAndEndDates}
                setDate={setEventStartAndEndDates}
              />
            </Label>
            {isGuestsInputOpen ? (
              <Button onClick={closeGuestModal} variant="secondary">
                Change location/date
                <Settings2 className="size-5" />
              </Button>
            ) : (
              <Button onClick={openGuestModal}>
                Continue <ArrowRight className="size-4" />
              </Button>
            )}
          </div>
          {/* <div className="flex w-full gap-2">
            <Label htmlFor="emails" className="w-full">
              <Input
                id="emails"
                placeholder={`${emailsToInvite.length} people invited`}
              />
            </Label>
            <Button type="button">Add emails</Button>
          </div> */}
          <div className="flex items-center gap-3 rounded-xl">
            <button
              type="button"
              onClick={openGuestModal}
              className="flex flex-1 items-center gap-2 rounded-md border px-4 py-2 text-left"
            >
              <UserRoundPlus className="size-5 text-zinc-400" />
              {emailsToInvite.length > 0 ? (
                <span className="flex-1  text-zinc-100">
                  {emailsToInvite.length} people invited
                </span>
              ) : (
                <span className="flex-1  text-zinc-400">
                  Who are you inviting?
                </span>
              )}
            </button>

            <Button onClick={openConfirmTripModal}>
              Confirm trip
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </article>

      {showModal && (
        <ConfirmTripModal
          createTrip={startTrip}
          closeConfirmTripModal={closeConfirmTripModal}
          setOwnerEmail={setOwnerEmail}
          setOwnerName={setOwnerName}
        />
      )}
      {isGuestsInputOpen && (
        <InviteParticipants
          emailsToInvite={emailsToInvite}
          closeGuestsModal={closeGuestModal}
          addNewEmailToInvite={addNewEmailToInvite}
          removeEmailFromInvites={(email) => {
            setEmailsToInvite(emailsToInvite.filter((e) => e !== email));
          }}
        />
      )}
    </main>
  );
}
