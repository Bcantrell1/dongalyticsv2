import { adminDb } from '@/lib/firebase-admin';
import * as admin from 'firebase-admin';
import { NextRequest, NextResponse } from 'next/server';

const OPENDOTA_API_BASE = process.env.NEXT_PUBLIC_OPENDOTA_API_BASE;

const VALID_RESOURCES = [
  'abilities', 'ability_ids', 'aghs_desc', 'ancients', 'chat_wheel', 'cluster',
  'countries', 'game_mode', 'hero_abilities', 'hero_lore', 'heroes', 'item_colors',
  'item_ids', 'items', 'lobby_type', 'neutral_abilities', 'order_types', 'patch',
  'patchnotes', 'permanent_buffs', 'player_colors', 'region', 'skillshots', 'xp_level',
];

async function fetchFromOpenDota(resource: string) {
  const url = `${OPENDOTA_API_BASE}/constants/${resource}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`OpenDota API error: ${response.statusText}`);
  }
  return response.json();
}

export async function POST(request: NextRequest) {
  // TODO: Add proper authentication here

  try {
    const updatedResources = [];
    const updates: { [key: string]: any } = {};

    for (const resource of VALID_RESOURCES) {
      const data = await fetchFromOpenDota(resource);
      updates[`opendota_constants/${resource}/value`] = data;
      updates[`opendota_constants/${resource}/lastUpdated`] = admin.database.ServerValue.TIMESTAMP;
      updatedResources.push(resource);
    }

    await adminDb.ref().update(updates);

    return NextResponse.json({ 
      message: 'Constants updated successfully', 
      updatedResources 
    });
  } catch (error) {
    console.error('Error updating constants:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}