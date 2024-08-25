import { getSteamId32FromEmail } from "@/lib/utils";
import { enrichMatchData } from "@/utils/enrichMatchData";
import { getServerSession } from "next-auth";
import { MatchCard } from './MatchCard';
import { PaginationControls } from "./PageinationControlsProps";

const ITEMS_PER_PAGE = 9;

interface Match {
  match_id: number;
  hero_image: string;
  hero_name: string;
  game_mode_name: string;
  kills: number;
  deaths: number;
  assists: number;
  duration: number;
  radiant_win: boolean;
  player_slot: number;
  start_time: number;
}

interface MatchListProps {
  initialPage: number;
}

export async function MatchList({ initialPage }: MatchListProps) {
  const session = await getServerSession();
  let enrichedMatches: Match[] | null = null;
  let totalMatches = 0;
  let error: string | null = null;

  if (session?.user?.email) {
    try {
      const steamId32 = getSteamId32FromEmail(session.user.email);
			const offset = (initialPage - 1) * ITEMS_PER_PAGE;
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/players/${steamId32}?endpoint=matches&limit=${ITEMS_PER_PAGE}&offset=${offset}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch recent matches');
      }


      const data = await response.json();
			const countResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/players/${steamId32}?endpoint=counts`);
      const countData = await countResponse.json();
      totalMatches = countData.game_mode[23].games || 100;
      enrichedMatches = await enrichMatchData(data);
    } catch (err) {
      console.error('Error fetching matches:', err);
      error = 'Failed to load recent matches. Please try again later.';
    }
  }

  const totalPages = Math.ceil(totalMatches / ITEMS_PER_PAGE);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!enrichedMatches) {
    return <p>No recent matches available</p>;
  }

  return (
    <div className="space-y-6 pb-12 ">
      <h2 className="text-2xl font-bold">Turbo Matches</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {enrichedMatches.map((match) => (
          <MatchCard key={match.match_id} match={match} />
        ))}
      </div>
      <PaginationControls initialPage={initialPage} totalPages={totalPages} />
    </div>
  );
}