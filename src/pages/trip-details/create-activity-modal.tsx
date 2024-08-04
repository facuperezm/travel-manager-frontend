import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function CreateActivityModal() {
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
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
