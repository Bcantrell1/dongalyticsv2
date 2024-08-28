import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { determineRank, getRankImage, RankTier } from "@/lib/utils";
import Image from 'next/image';

interface Match {
  match_id: number;
  player_slot: number;
  radiant_win: boolean;
  kills: number;
  deaths: number;
  assists: number;
}

interface RankedPlayerProps {
  player: {
    steam_id: string;
    personaname: string;
    avatarfull: string;
    recentMatches: Match[];
    score: number;
  };
  rank: number;
}

export function RankedPlayerCard({ player, rank }: RankedPlayerProps) {
  const recentWins = player.recentMatches.filter(match => 
    (match.player_slot < 128) === match.radiant_win
  ).length;

  const { totalKills, totalDeaths, totalAssists } = player.recentMatches.reduce(
    (acc, match) => ({
      totalKills: acc.totalKills + match.kills,
      totalDeaths: acc.totalDeaths + match.deaths,
      totalAssists: acc.totalAssists + match.assists,
    }),
    { totalKills: 0, totalDeaths: 0, totalAssists: 0 }
  );

  const averageKDA = ((totalKills + totalAssists) / (totalDeaths || 1)).toFixed(2);
  const kdaString = `${totalKills}/${totalDeaths}/${totalAssists}`;

	const playerRank: RankTier = determineRank(player.score);
  const rankImageSrc = getRankImage(playerRank)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Image 
          src={player.avatarfull}
          alt={player.personaname}
          width={64}
          height={64}
          className="rounded-xl"
        />
         <div className="flex-grow">
          <CardTitle>{player.personaname}</CardTitle>
          <p className="text-sm text-muted-foreground">
            Rank: #{rank}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Image 
            src={rankImageSrc}
            alt={playerRank}
            width={64}
            height={64}
						className="rounded-2xl"
          />
          <span className="text-xs mt-1">{playerRank}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-sm font-medium">MMR</span>
            <span>{Math.round(player.score)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Recent W/L</span>
            <span>{recentWins}/{20 - recentWins}</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-sm font-medium">K-D-A</span>
            <span>{kdaString}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Inches</span>
            <span>{averageKDA}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}