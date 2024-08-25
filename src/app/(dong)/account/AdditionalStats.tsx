import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdditionalStatsProps {
  totalGames: number;
  totals: any[];
}

export function AdditionalStats({ totalGames, totals }: AdditionalStatsProps) {
  const getAverage = (field: string) => {
    const stat = totals.find((t: any) => t.field === field);
    return stat ? (stat.sum / stat.n).toFixed(0) : 0;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{totalGames}</p>
            <p className="text-sm text-gray-500">Games Played</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{getAverage('gold_per_min')}</p>
            <p className="text-sm text-gray-500">Average GPM</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{getAverage('xp_per_min')}</p>
            <p className="text-sm text-gray-500">Average XPM</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{getAverage('last_hits')}</p>
            <p className="text-sm text-gray-500">Average Last Hits</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}