import { getTripDetails } from '@/api/get-trip-details';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import {
  CircleCheck,
  Copy,
  CreditCard,
  Link2,
  MoreVertical,
  PersonStanding,
  Plus,
  PlusCircleIcon,
  Truck,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { getActivities } from '@/api/get-activities';
import { createActivity } from '@/api/create-activity';

export function TripDetailsPage() {
  const { tripId } = useParams<{ tripId: string }>();

  if (!tripId) {
    return null;
  }

  const { data } = useQuery({
    queryKey: ['trip'],
    queryFn: () => getTripDetails({ tripId }),
  });

  const fromData = data?.trip.starts_at
    ? format(new Date(data.trip.starts_at), 'LLLL dd')
    : 'N/A';

  const toData = data?.trip.ends_at
    ? format(new Date(data.trip.ends_at), 'LLLL dd')
    : 'N/A';

  const { data: activities } = useQuery({
    queryKey: ['trip', 'activities'],
    queryFn: () => getActivities({ tripId }),
  });

  const { mutateAsync } = useMutation({
    mutationFn: createActivity,
  });
  async function addActivity() {
    const res = await mutateAsync({
      tripId,
      title: 'New Activity',
      occursAt: new Date().toISOString(),
    });
    console.log(res);
  }

  return (
    <div className="space-y-4">
      <header className="mt-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between rounded bg-secondary/50 px-4 py-2">
          <h1 className="text-xl">Trip to {data?.trip.destination}</h1>
          <div className="flex items-center gap-2">
            <p className="text-sm text-zinc-300">
              From {fromData} to {toData}
            </p>
            <Button variant="outlined">Add new activity</Button>
          </div>
        </div>
      </header>
      <main className="mx-auto flex max-w-5xl space-x-4 px-4">
        <div className="flex-1">
          <article>
            <div className="space-y-8">
              {activities?.activities.map((category) => {
                return (
                  <div key={category.date} className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-semibold ">
                        Dia {format(category.date, 'd')}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {format(category.date, 'EEEE')}
                      </span>
                    </div>
                    {category.activities.length > 0 ? (
                      <div>
                        {category.activities.map((activity) => {
                          return (
                            <div key={activity.id} className="space-y-2.5">
                              <div className="shadow-shape flex items-center gap-3 rounded-xl bg-zinc-900 px-4 py-2.5">
                                <CircleCheck className="size-5 text-lime-300" />
                                <span className="text-zinc-100">
                                  {activity.title}
                                </span>
                                <span className="ml-auto text-sm text-zinc-400">
                                  {format(activity.occurs_at, 'HH:mm')}h
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
        </div>
        <div>
          <article className="space-y-2">
            <Card>
              <CardHeader>
                <CardTitle>Activities</CardTitle>
                <CardDescription>
                  This is a list of activities that are planned for this trip.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul>
                  {activities &&
                    activities.activities.map((activity) => (
                      <li
                        key={activity.id}
                        className="flex items-center justify-between"
                      >
                        <span>{activity.title}</span>
                        <span>{activity.occurs_at}</span>
                      </li>
                    ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button>Add new activity</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Important links</CardTitle>
                <CardDescription>
                  {' '}
                  Links to important resources{' '}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <span className="block font-medium text-zinc-100">
                        Reserva de hotel
                      </span>
                      <a
                        href="#"
                        className="block truncate text-xs text-zinc-400 hover:text-zinc-200"
                      >
                        https://www.booking.com/104700011390
                      </a>
                    </div>

                    <Link2 className="size-5 shrink-0 text-zinc-400" />
                  </li>
                  <li className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <span className="block font-medium text-zinc-100">
                        Reserva de hotel
                      </span>
                      <a
                        href="#"
                        className="block truncate text-xs text-zinc-400 hover:text-zinc-200"
                      >
                        https://www.booking.com/104700011390
                      </a>
                    </div>

                    <Link2 className="size-5 shrink-0 text-zinc-400" />
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button>Add new activity</Button>
              </CardFooter>
            </Card>
          </article>
        </div>
      </main>
    </div>
  );
}
