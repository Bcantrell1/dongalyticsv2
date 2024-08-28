import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from 'next/image';
import React from 'react';

const medalRanks = [
  { name: 'Gigga Dong', scoreRange: 'Above 10000', imageSrc: '/medals/gigga_dong.png' },
  { name: 'Nice Dong', scoreRange: '8001 - 10000', imageSrc: '/medals/nice_dong.png' },
  { name: 'Standard Dong', scoreRange: '6001 - 8000', imageSrc: '/medals/standard_dong.png' },
  { name: 'Boner', scoreRange: '4001 - 6000', imageSrc: '/medals/boner.png' },
  { name: 'Little Bony', scoreRange: '4000 and below', imageSrc: '/medals/little_bony.png' },
];

export function MedalSystemExplanation() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Dong Guild Medal System</CardTitle>
        <CardDescription>Understanding the ranks and how to achieve them</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Score Range</TableHead>
              <TableHead>Medal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medalRanks.map((rank) => (
              <TableRow key={rank.name}>
                <TableCell className="font-medium">{rank.name}</TableCell>
                <TableCell>{rank.scoreRange}</TableCell>
                <TableCell>
                  <Image 
                    src={rank.imageSrc}
                    alt={rank.name}
                    width={64}
                    height={64}
										className="rounded-2xl"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}