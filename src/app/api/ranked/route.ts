import { NextResponse } from 'next/server';

// Array of steam32 IDs for Dong Guild members
const DONG_GUILD_MEMBERS = [
  "903536266",
  "71250366",
	"44550203",
	"109935588",
	"104985990",
	"102935945",
	"134622924"
];
interface Match {
  match_id: number;
  player_slot: number;
  radiant_win: boolean;
  kills: number;
  deaths: number;
  assists: number;
}

interface Player {
  steam_id: string;
  personaname: string;
  avatarfull: string;
  recentMatches: Match[];
  score: number;
}

function calculateScore(matches: Match[]): number {
  const BASE_WIN_POINTS = 300;
  const BASE_LOSS_POINTS = -200;
  const KDA_MULTIPLIER = 50;
  const RECENT_MATCH_WEIGHT = 1.5;

  return matches.reduce((score, match, index) => {
    const won = (match.player_slot < 128) === match.radiant_win;
    const kda = (match.kills + match.assists) / (match.deaths || 1);
    
    let matchScore = won ? BASE_WIN_POINTS : BASE_LOSS_POINTS;
    
    matchScore += (kda - 1) * KDA_MULTIPLIER;

    const recencyWeight = 1 + (RECENT_MATCH_WEIGHT - 1) * (index / (matches.length - 1));
    matchScore *= recencyWeight;

    return score + matchScore;
  }, 0);
}

export async function GET() {
  try {
    const playerPromises = DONG_GUILD_MEMBERS.map(async (steamId) => {
      const [playerResponse, matchesResponse] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/players/${steamId}?endpoint=profile`),
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/players/${steamId}?endpoint=recentMatches`)
      ]);

      if (!playerResponse.ok || !matchesResponse.ok) {
        throw new Error(`Failed to fetch data for player ${steamId}`);
      }

      const playerData = await playerResponse.json();
      const matchesData = await matchesResponse.json();

      const recentMatches = matchesData.slice(0, 20);
      const score = calculateScore(recentMatches);

      return {
        steam_id: steamId,
        personaname: playerData.profile.personaname,
        avatarfull: playerData.profile.avatarfull,
        recentMatches,
        score
      };
    });

    const players = await Promise.all(playerPromises);

    // Sort players by score (descending)
    players.sort((a, b) => b.score - a.score);

    return NextResponse.json(players);
  } catch (error) {
    console.error('Error in ranked API:', error);
    return NextResponse.json({ error: 'Failed to fetch ranked data' }, { status: 500 });
  }
}