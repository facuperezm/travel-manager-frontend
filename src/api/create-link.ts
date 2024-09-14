import { api } from '@/lib/axios';

export interface CreateLinkMutation {
  title: string;
  url: string;
  tripId: string;
}

export async function createLink({ title, url, tripId }: CreateLinkMutation) {
  try {
    const response = await api.post(`/trips/${tripId}/links`, {
      title,
      url,
    });
    return response.data;
  } catch (error) {
    // Handle or throw the error appropriately
    console.error('Failed to create trip', error);
    throw error;
  }
}
