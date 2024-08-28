import { RankedPlayerCard } from './RankedPlayerCard';

interface Match {
  match_id: number;
  player_slot: number;
  radiant_win: boolean;
  kills: number;
  deaths: number;
  assists: number;
}

interface RankedPlayer {
  steam_id: string;
  personaname: string;
  avatarfull: string;
  recentMatches: Match[];
  score: number;
}

async function getRankedData(): Promise<RankedPlayer[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ranked`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch ranked data');
  }
  return res.json();
}

export async function RankedList() {
  const players = await getRankedData();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl mt-12 font-bold">Dong Guild Ranked Players</h2>
			<p>MMR is determined by statistics accumulated over the last 20 matches: Kills, Deaths, Assists, and W/L ratio.</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {players.map((player, index) => (
          <RankedPlayerCard key={player.steam_id} player={player} rank={index + 1} />
        ))}
      </div>
    </div>
  );
}