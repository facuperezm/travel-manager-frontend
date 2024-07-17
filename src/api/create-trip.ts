import { api } from '@/lib/axios';

export interface CreateTripsMutation {
  destination: string;
  starts_at: string;
  ends_at: string;
  owner_name: string;
  owner_email: string;
  emails_to_invite: string[];
}

export async function createTrip({
  destination,
  starts_at,
  ends_at,
  owner_name,
  owner_email,
  emails_to_invite,
}: CreateTripsMutation) {
  const response = await api.post<CreateTripsMutation>('/trips', {
    body: {
      destination,
      starts_at,
      ends_at,
      owner_name,
      owner_email,
      emails_to_invite,
    },
  });

  return response.data;
}
