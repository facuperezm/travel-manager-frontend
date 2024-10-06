import { api } from '@/lib/axios';

export interface GetActivitiesQuery {
  tripId: string;
}

export interface Activity {
  id: string;
  title: string;
  occurs_at: string;
}

export interface ActivityGroup {
  date: string;
  activities: Activity[];
}

export type GetActivitiesResponse = ActivityGroup[];

export async function getActivities({
  tripId,
}: GetActivitiesQuery): Promise<GetActivitiesResponse> {
  try {
    const response = await api.get<GetActivitiesResponse>(
      `/trips/${tripId}/activities`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
}
