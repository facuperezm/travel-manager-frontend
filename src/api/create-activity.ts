import { api } from '@/lib/axios';

export interface CreateActivityMutation {
  title: string;
  occurs_at: string;
  tripId: string;
}

export interface CreateActivityResponse {
  activity: string;
}

export async function createActivity({
  title,
  occurs_at,
  tripId,
}: CreateActivityMutation): Promise<CreateActivityResponse> {
  try {
    const response = await api.post<CreateActivityResponse>(
      `/trips/${tripId}/activities`,
      { title, occurs_at }
    );
    return response.data;
  } catch (error) {
    // Handle or throw the error appropriately
    console.error('Failed to create trip', error);
    throw error;
  }
}
