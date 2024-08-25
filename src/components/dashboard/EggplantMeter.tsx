'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useRef, useState } from 'react';

interface Match {
  kills: number;
  deaths: number;
  assists: number;
}

interface EggplantMeterProps {
  recentMatches: Match[];
}

export function EggplantMeter({ recentMatches }: EggplantMeterProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const calculateInches = (kills: number, deaths: number, assists: number): number => 
    Number(((kills + assists) / deaths).toFixed(3));

  const getEggplantWidth = (inches: number): number => 
    Math.max(50, 50 + inches * 120);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const totalStats = recentMatches.reduce(
    (acc, match) => ({
      kills: acc.kills + match.kills,
      deaths: acc.deaths + match.deaths,
      assists: acc.assists + match.assists,
    }),
    { kills: 0, deaths: 0, assists: 0 }
  );

  const inches = calculateInches(totalStats.kills, totalStats.deaths, totalStats.assists);
  const eggplantWidth = getEggplantWidth(inches);
  const scaleFactor = Math.min(1, containerWidth / eggplantWidth);

  return (
    <Card className="border-none">
      <CardContent className="flex pt-12 flex-col items-center">
        <div ref={containerRef} className="w-full flex justify-center overflow-hidden">
          <div 
            style={{ 
              width: `${eggplantWidth}px`, 
              height: 'auto', 
              transform: `scaleX(${scaleFactor})`,
            }}
          >
            <img 
              src="/eggplant_inch.png" 
              alt="Eggplant" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
        <p className="mt-4 text-lg font-semibold">{inches.toFixed(2)} inches</p>
        <p className="text-sm text-gray-500">Based on recent {recentMatches.length} matches</p>
      </CardContent>
    </Card>
  );
}