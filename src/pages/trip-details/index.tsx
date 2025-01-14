import { useMutation, useQuery } from '@tanstack/react-query';
import { CircleCheck, CircleDashed, Link2, Star } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { getTripDetails } from '@/api/get-trip-details';
import { createActivity } from '@/api/create-activity';
import { getActivities } from '@/api/get-activities';
import { getTripParticipants } from '@/api/get-trip-participants';
import { getLinks } from '@/api/get-links';
import { createLink } from '@/api/create-link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { queryClient } from '@/lib/react-query';
import { format, parseISO } from 'date-fns';
import CreateActivityModal from './create-activity-modal';
import CreateLinkModal from './create-link-modal';
import { cn } from '@/lib/utils';

export function TripDetailsPage() {
  const { tripId } = useParams<{ tripId: string }>();

  if (!tripId) {
    return null;
  }

  const { data: tripDetails } = useQuery({
    queryKey: ['trip', tripId],
    queryFn: () => getTripDetails({ tripId }),
  });

  const { data: activities } = useQuery({
    queryKey: ['activities', tripId],
    queryFn: () => getActivities({ tripId }),
  });

  const { data: links } = useQuery({
    queryKey: ['links', tripId],
    queryFn: () => getLinks({ tripId }),
  });

  const { data: participants } = useQuery({
    queryKey: ['participants', tripId],
    queryFn: () => getTripParticipants({ tripId }),
  });

  const { mutateAsync: createActivityMutation } = useMutation({
    mutationFn: createActivity,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['activities', tripId] });
    },
  });

  const fromData = tripDetails?.trip.starts_at
    ? format(new Date(tripDetails.trip.starts_at), 'LLLL dd')
    : 'N/A';

  const toData = tripDetails?.trip.ends_at
    ? format(new Date(tripDetails.trip.ends_at), 'LLLL dd')
    : 'N/A';

  const { mutateAsync: createLinkMutation } = useMutation({
    mutationFn: createLink,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['links', tripId] });
    },
  });

  async function addLink(linkData: { title: string; url: string }) {
    if (!tripId) return;
    try {
      await createLinkMutation({
        ...linkData,
        tripId,
      });
    } catch (error) {
      console.error('Error al añadir enlace', error);
    }
  }

  async function addActivity(activityData: {
    title: string;
    occurs_at: string;
  }) {
    if (!tripId) return;
    try {
      await createActivityMutation({
        ...activityData,
        tripId,
      });
    } catch (error) {
      console.error('Error adding activity', error);
    }
  }

  return (
    <div className="space-y-4">
      <header className="mt-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between rounded bg-secondary/50 px-4 py-2">
          <h1 className="text-xl">Trip to {tripDetails?.trip.destination}</h1>
          <div className="flex items-center gap-4">
            <p className="text-sm text-zinc-300">
              From {fromData} to {toData}
            </p>
            <CreateActivityModal tripId={tripId} onAddActivity={addActivity} />
          </div>
        </div>
      </header>
      <main className="mx-auto flex max-w-5xl flex-col-reverse gap-6 px-4 sm:flex-row">
        <article className="flex-1">
          <div className="space-y-8">
            {activities?.map((category) => {
              return (
                <div key={category.date} className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-semibold ">
                      {format(category.date, 'dd MMM')}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {format(category.date, 'EEEE')}
                    </span>
                  </div>
                  {category.activities.length > 0 ? (
                    <div className="space-y-2">
                      {category.activities.map((activity) => {
                        return (
                          <div key={activity.id} className="space-y-2.5">
                            <div className="shadow-shape flex items-center gap-3 rounded-xl bg-zinc-900 px-4 py-2.5">
                              <CircleCheck className="size-5 text-lime-300" />
                              <span
                                className={
                                  new Date(activity.occurs_at) < new Date()
                                    ? 'text-zinc-400 line-through'
                                    : 'text-zinc-100'
                                }
                              >
                                {activity.title}
                              </span>
                              <span className="ml-auto text-sm text-zinc-400">
                                {format(
                                  parseISO(activity.occurs_at),
                                  "HH:mm'h'"
                                )}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-zinc-500">
                      No activities planned for this day yet.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </article>
        <article className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Important links</CardTitle>
              <CardDescription>Links to important resources</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {links && links.length > 0 ? (
                  links.map((link) => (
                    <li className="space-y-1" key={link.id}>
                      <a href={link.url} className="truncate text-zinc-400">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-zinc-100">
                            {link.title}
                          </span>
                          <Link2 className="size-5 shrink-0 text-zinc-400" />
                        </div>
                        <span className="text-xs text-zinc-400 hover:text-zinc-200">
                          {link.url}
                        </span>
                      </a>
                    </li>
                  ))
                ) : (
                  <div className="flex w-full items-center justify-center rounded-md border border-dashed border-zinc-700 px-2 py-4">
                    <p className="text-sm text-zinc-500">
                      No links added for this trip yet.
                    </p>
                  </div>
                )}
              </ul>
            </CardContent>
            <CardFooter>
              <CreateLinkModal onAddLink={addLink} />
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Participants</CardTitle>
              <CardDescription>
                People who are going to your trip
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {participants?.map((participant) => (
                  <li
                    key={participant.id}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <span
                        className={cn(
                          participant.is_confirmed
                            ? 'text-zinc-100'
                            : 'text-zinc-400',
                          'flex items-center gap-1 font-medium'
                        )}
                      >
                        {participant.is_confirmed ? (
                          <CircleCheck className="size-5 text-lime-300" />
                        ) : (
                          <CircleDashed className="size-5 text-zinc-400" />
                        )}
                        {participant.name}
                        {participant.is_owner && (
                          <Star
                            className="ml-2 h-4 w-4 text-yellow-300"
                            aria-label="Trip owner"
                          />
                        )}
                      </span>
                      <span className="text-xs text-gray-400">
                        {participant.email}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </article>
      </main>
    </div>
  );
}
