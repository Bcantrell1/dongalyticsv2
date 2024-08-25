import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface MatchProps {
  match: {
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
  };
}

export function MatchCard({ match }: MatchProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Image 
          src={match.hero_image} 
          alt={match.hero_name} 
          width={64} 
          height={64} 
          className="rounded w-auto"
        />
        <div>
          <CardTitle>{match.hero_name}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {match.game_mode_name}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-sm font-medium">K/D/A</span>
            <span>{match.kills}/{match.deaths}/{match.assists}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Duration</span>
            <span>{Math.floor(match.duration / 60)}:{(match.duration % 60).toString().padStart(2, '0')}</span>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <Badge 
            variant="outline"
            className={cn(
              match.radiant_win === (match.player_slot < 128)
                ? "border-green-500 text-green-500"
                : "border-red-500 text-red-500"
            )}
          >
            {match.radiant_win === (match.player_slot < 128) ? "Victory" : "Defeat"}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {new Date(match.start_time * 1000).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}