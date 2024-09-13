import { api } from '@/lib/axios';

export interface Link {
  id: string;
  title: string;
  url: string;
  trip_id: string;
}

export interface GetLinksQuery {
  tripId: string;
}

export type GetLinksResponse = Link[];

export async function getLinks({
  tripId,
}: GetLinksQuery): Promise<GetLinksResponse | null> {
  try {
    const response = await api.get<{ links: Link[] }>(`/trips/${tripId}/links`);
    return response.data.links;
  } catch (error) {
    console.error('Error fetching activities:', error);
    return null;
  }
}