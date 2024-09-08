import { api } from '@/lib/axios';

export interface CreateLinkMutation {
  title: string;
  occurs_at: string;
  tripId: string;
}

export async function createLink({
  title,
  occurs_at,
  tripId,
}: CreateLinkMutation) {
  try {
    const response = await api.post(`/trips/${tripId}/links`, {
      title,
      occurs_at,
    });
    return response.data;
  } catch (error) {
    // Handle or throw the error appropriately
    console.error('Failed to create trip', error);
    throw error;
  }
}
