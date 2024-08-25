'use server';

import { getSteamId32FromEmail } from "@/lib/utils";
import { getServerSession } from "next-auth";

export async function fetchHistogramData(field: string) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    throw new Error('Unauthorized');
  }

  const steamId32 = getSteamId32FromEmail(session.user.email);

  const OPENDOTA_API_BASE = process.env.NEXT_PUBLIC_OPENDOTA_API_BASE;
  const url = `${OPENDOTA_API_BASE}/players/${steamId32}/histograms/${field}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`OpenDota API error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching histogram data:', error);
    throw error;
  }
}