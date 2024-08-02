import { api } from '@/lib/axios';

export interface GetActivitiesQuery {
  tripId: string;
}

export interface GetActivitiesResponse {
  activities: {
    date: string;
    activities: {
      id: string;
      title: string;
      occurs_at: string;
    }[];
  }[];
}

export async function getActivities({
  tripId,
}: GetActivitiesQuery): Promise<GetActivitiesResponse | null> {
  try {
    const response = await api.get<GetActivitiesResponse>(
      `/trips/${tripId}/activities`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching activities:', error);
    return null;
  }
}
