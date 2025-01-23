import React, { useState, useCallback } from 'react';
import { createTrip } from '@/api/create-trip';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMutation } from '@tanstack/react-query';
import { addDays } from 'date-fns';
import { ArrowRight, Settings2, UserRoundPlus } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { ConfirmTripModal } from './confirm-trip-modal';
import { DatePickerWithRange } from './date-range-picker';
import { InviteParticipants } from './invite-participants';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { AxiosError } from 'axios';

export function CreateTripPage() {
  const navigate = useNavigate();
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >({
    from: new Date(),
    to: addDays(new Date(), 2),
  });
  const [destination, setDestination] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [emailsToInvite, setEmailsToInvite] = useState(['facu@test.com']);

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isDestinationAndDate, setIsDestinationAndDate] = useState(false);

  const addNewEmailToInvite = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const email = data.get('email')?.toString();

      if (email && !emailsToInvite.includes(email)) {
        setEmailsToInvite((prevEmails) => [...prevEmails, email]);
        event.currentTarget.reset();
      }
    },
    [emailsToInvite]
  );

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createTrip,
  });

  const startTrip = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const res = await mutateAsync({
          destination,
          starts_at: eventStartAndEndDates?.from?.toString() ?? '',
          ends_at: eventStartAndEndDates?.to?.toString() ?? '',
          owner_name: ownerName,
          owner_email: ownerEmail,
          emails_to_invite: emailsToInvite,
        });
        navigate(`/trips/${res.tripId}`);
      } catch (error) {
        if (error instanceof AxiosError && error.response?.data) {
          const errorMessage = error.response.data.error;
          toast({
            title: 'There was an error creating the trip',
            description: errorMessage,
          });
        }
      }
    },
    [
      destination,
      eventStartAndEndDates,
      ownerName,
      ownerEmail,
      emailsToInvite,
      mutateAsync,
      navigate,
    ]
  );

  const handleFirstStep = useCallback(() => {
    if (destination && eventStartAndEndDates) {
      setIsDestinationAndDate(true);
    }
  }, [destination, eventStartAndEndDates]);

  const goBackFirstStep = useCallback(() => {
    setIsDestinationAndDate(false);
  }, []);

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-6 px-4 sm:flex-row">
      <div className="w-full max-w-3xl space-y-6 px-6">
        <header className="space-y-4">
          <h1 className="text-center text-2xl">
            Welcome to travel manager app
          </h1>
          <h2 className="text-center leading-tight">
            Create a trip by filling out the form below and clicking the "Create
            Trip" button.
          </h2>
        </header>
        <article>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Label htmlFor="where" className="flex-1">
                <Input
                  id="where"
                  placeholder="Where are you going?"
                  disabled={isDestinationAndDate}
                  onChange={(event) => setDestination(event.target.value)}
                />
              </Label>
              <DatePickerWithRange
                isDisabled={isDestinationAndDate}
                date={eventStartAndEndDates}
                setDate={setEventStartAndEndDates}
              />
              {isDestinationAndDate ? (
                <Button onClick={goBackFirstStep} variant="secondary">
                  Change location/date
                  <Settings2 className="ml-1 size-5" />
                </Button>
              ) : (
                <Button onClick={handleFirstStep}>
                  Continue <ArrowRight className="size-4" />
                </Button>
              )}
            </div>
            {isDestinationAndDate && (
              <div className="flex items-center gap-3 rounded-xl">
                <button
                  type="button"
                  onClick={() => setIsGuestsInputOpen(true)}
                  className="flex flex-1 items-center gap-2 rounded-md border px-4 py-2 text-left text-sm"
                >
                  <UserRoundPlus className="size-5 text-zinc-400" />
                  {emailsToInvite.length > 0 ? (
                    <span className="flex-1 text-zinc-100">
                      {emailsToInvite.length} people invited
                    </span>
                  ) : (
                    <span className="flex-1 text-zinc-400">
                      Who are you inviting?
                    </span>
                  )}
                </button>

                <Button onClick={() => setIsConfirmationModalOpen(true)}>
                  Confirm trip
                  <ArrowRight className="size-5" />
                </Button>
              </div>
            )}
          </div>
        </article>
        {isGuestsInputOpen && (
          <InviteParticipants
            emailsToInvite={emailsToInvite}
            closeGuestsModal={() => setIsGuestsInputOpen(false)}
            addNewEmailToInvite={addNewEmailToInvite}
            removeEmailFromInvites={(email) => {
              setEmailsToInvite(emailsToInvite.filter((e) => e !== email));
            }}
          />
        )}
        {isConfirmationModalOpen && (
          <ConfirmTripModal
            eventStartAndEndDates={eventStartAndEndDates}
            destination={destination}
            createTrip={startTrip}
            isPending={isPending}
            closeConfirmTripModal={() => setIsConfirmationModalOpen(false)}
            setOwnerEmail={setOwnerEmail}
            setOwnerName={setOwnerName}
          />
        )}
      </div>
    </main>
  );
}
