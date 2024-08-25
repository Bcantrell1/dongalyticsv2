import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TotalsCardProps {
  totals: any[];
}

export function TotalsCard({ totals }: TotalsCardProps) {
  const getTotal = (field: string) => totals.find((t: any) => t.field === field)?.sum || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Totals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{getTotal('kills')}</p>
            <p className="text-sm text-gray-500">Kills</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{getTotal('deaths')}</p>
            <p className="text-sm text-gray-500">Deaths</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{getTotal('assists')}</p>
            <p className="text-sm text-gray-500">Assists</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}