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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format, setHours, setMinutes } from 'date-fns';
import React, { ChangeEventHandler } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const formSchema = z.object({
  date: z.string().date(),
  name: z.string().min(3),
  time: z.string().datetime(),
});

export default function CreateActivityModal() {
  const [timeValue, setTimeValue] = React.useState<string>('00:00');
  const [selected, setSelected] = React.useState<Date>();
  const [date, setDate] = React.useState<Date>();

  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!selected) {
      setTimeValue(time);
      return;
    }
    const [hours, minutes] = time.split(':').map((str) => parseInt(str, 10));
    const newSelectedDate = setHours(setMinutes(selected, minutes), hours);
    setSelected(newSelectedDate);
    setTimeValue(time);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: '',
      time: '',
      name: '',
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(`${values.date}T${values.time}Z`);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add activity</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add an activity to your trip</DialogTitle>
          <DialogDescription>
            Here you'll be able to add activities to your trip
          </DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[280px] justify-start text-left font-normal',
                              !date && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                              format(date, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormDescription>
                      This is the date the activity will occur.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Go to the beach" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the name of the activity.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <input
                type="time"
                value={timeValue}
                onChange={handleTimeChange}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
