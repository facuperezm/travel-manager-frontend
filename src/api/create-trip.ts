import { api } from '@/lib/axios';

export interface CreateTripsMutation {
  destination: string;
  starts_at: string;
  ends_at: string;
  owner_name: string;
  owner_email: string;
  emails_to_invite: string[];
}

export interface CreateTripResponse {
  tripId: string;
}

export async function createTrip(
  input: CreateTripsMutation
): Promise<CreateTripResponse> {
  try {
    const response = await api.post<CreateTripResponse>('/trips', input);
    return response.data;
  } catch (error) {
    // Handle or throw the error appropriately
    console.error('Failed to create trip', error);
    throw error;
  }
}
