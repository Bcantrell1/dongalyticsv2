import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoIcon } from 'lucide-react';
import React from 'react';

export function MMRExplanation() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Understanding the Dong Guild MMR System</CardTitle>
        <CardDescription>Learn how your rank is calculated and how to improve it</CardDescription>
      </CardHeader>
      <CardContent>
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>The Basics</AlertTitle>
          <AlertDescription>
            Our MMR system reflects your performance over your last 20 matches, considering:
            <ul className="list-disc list-inside mt-2">
              <li>Wins and Losses</li>
              <li>Your KDA (Kills, Deaths, Assists)</li>
              <li>How recent the match was</li>
            </ul>
          </AlertDescription>
        </Alert>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Key Points:</h3>
          <ul className="list-disc list-inside">
            <li>Winning is the most important factor</li>
            <li>Consistent performance (high KDA) boosts your score</li>
            <li>Recent matches have more impact on your rank</li>
          </ul>
        </div>

        <Accordion type="single" collapsible className="w-full mt-4">
          <AccordionItem value="calculation">
            <AccordionTrigger>How Your Score is Calculated</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">For each match, we calculate a score based on:</p>
              <ol className="list-decimal list-inside">
                <li className="mb-2">
                  <strong>Base Points:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Win: <Badge variant="secondary">+300 points</Badge></li>
                    <li>Loss: <Badge variant="secondary">-200 points</Badge></li>
                  </ul>
                </li>
                <li className="mb-2">
                  <strong>KDA Bonus/Penalty:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>KDA above 1.0 increases your score</li>
                    <li>KDA below 1.0 decreases your score</li>
                  </ul>
                </li>
                <li>
                  <strong>Recency Boost:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Most recent match has 1.5x the weight of the oldest match</li>
                  </ul>
                </li>
              </ol>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="tips">
            <AccordionTrigger>Tips to Improve Your Rank</AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal list-inside">
                <li>Focus on winning games duh..</li>
                <li>If you are losing a game and a support, let your other players die like Dump.</li>
                <li>Play with the boys - dont be a loser and lose MMR solo</li>
                <li>Recent games matter more, so dont be a scrub.</li>
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}