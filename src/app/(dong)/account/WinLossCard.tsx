import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WinLossCardProps {
  wins: number;
  losses: number;
}

export function WinLossCard({ wins, losses }: WinLossCardProps) {
  const winRate = ((wins / (wins + losses)) * 100).toFixed(2);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Win/Loss</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-500">{wins}</p>
            <p className="text-sm text-gray-500">Wins</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-500">{losses}</p>
            <p className="text-sm text-gray-500">Losses</p>
          </div>
        </div>
        <p className="mt-4 text-center">Win Rate: <span className="font-bold">{winRate}%</span></p>
      </CardContent>
    </Card>
  );
}