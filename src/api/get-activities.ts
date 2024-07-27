import { api } from '@/lib/axios';

export interface GetActivitiesQuery {
  tripId: string;
}

export interface GetActivitiesResponse {
  activities: {
    id: string;
    title: string;
    occurs_at: string;
    trip_id: string;
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
