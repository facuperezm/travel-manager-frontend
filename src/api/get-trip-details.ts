import { api } from '@/lib/axios';

export interface GetTripDetailsQuery {
  tripId: string;
}

export interface GetTripDetailsResponse {
  trip: {
    id: string;
    destination: string;
    starts_at: string;
    ends_at: string;
    is_confirmed: boolean;
  };
}

export async function getTripDetails({ tripId }: GetTripDetailsQuery) {
  const response = await api.get<GetTripDetailsResponse>(`/trips/${tripId}`);

  return response.data;
}
