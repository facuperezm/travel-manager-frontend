import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useQuery } from '@tanstack/react-query';
import { getTripDetails } from '@/api/get-trip-details';

const formSchema = z.object({
  date: z.date(),
  name: z.string().min(3),
  time: z.string(),
});

interface CreateActivityModalProps {
  tripId: string;
  onAddActivity: (activityData: {
    title: string;
    occurs_at: string;
  }) => Promise<void>;
}

export default function CreateActivityModal({
  tripId,
  onAddActivity,
}: CreateActivityModalProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const { data } = useQuery({
    queryKey: ['trip', tripId],
    queryFn: () => getTripDetails({ tripId }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      time: '',
      name: '',
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const occurs_at = `${format(values.date, 'yyyy-MM-dd')}T${values.time}`;
    await onAddActivity({ title: values.name, occurs_at });
    form.reset();
    setIsOpen(false);
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add activity</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add an activity to your trip</DialogTitle>
          <DialogDescription>
            Add an activity to your trip. This could be anything from going to
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[200px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          today={
                            data?.trip?.starts_at
                              ? new Date(data.trip.starts_at)
                              : undefined
                          }
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date(data?.trip?.ends_at ?? '') ||
                            date < new Date(data?.trip?.starts_at ?? '')
                          }
                          fromDate={
                            data?.trip?.starts_at
                              ? new Date(data.trip.starts_at)
                              : undefined
                          }
                          toDate={
                            data?.trip?.ends_at
                              ? new Date(data.trip.ends_at)
                              : undefined
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activity name</FormLabel>
                  <FormControl>
                    <Input placeholder="Go to the beach" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
