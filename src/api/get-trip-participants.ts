import { api } from '@/lib/axios';

export interface GetTripParticipantsQuery {
  tripId: string;
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  is_confirmed: boolean;
}

export type GetTripParticipantsResponse = Participant[];

export async function getTripParticipants({
  tripId,
}: GetTripParticipantsQuery): Promise<GetTripParticipantsResponse> {
  try {
    const response = await api.get<{ participants: Participant[] }>(
      `/trips/${tripId}/participants`
    );
    return response.data.participants;
  } catch (error) {
    console.error('Error fetching participants:', error);
    return [];
  }
}
