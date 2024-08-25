import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface HeroListProps {
  title: string;
  heroes: any[];
  renderStats: (hero: any) => React.ReactNode;
}

export function HeroList({ title, heroes, renderStats }: HeroListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {heroes.map((hero) => (
            <Card key={hero.hero_name} className="overflow-hidden">
              <div className="relative pb-[100%]">
                <Image 
                  src={hero.hero_image} 
                  alt={hero.hero_name} 
									fill
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-center mb-2">{hero.hero_name}</h3>
                <div className="text-sm text-center text-gray-500">
                  {renderStats(hero)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}