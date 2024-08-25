'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchHistogramData } from '@/utils/fetchHistogramData';
import React, { useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface HistogramData {
  x: number;
  games: number;
  cumulative_sum: number;
}

interface HistogramChartProps {
  title: string;
  initialData: HistogramData[];
  fields: string[];
}

export function HistogramChart({ title, initialData, fields }: HistogramChartProps) {
  const [data, setData] = useState(initialData);
  const [currentField, setCurrentField] = useState(fields[0]);

  const handleFieldChange = async (field: string) => {
    setCurrentField(field);
    try {
      const newData = await fetchHistogramData(field);
      setData(newData);
    } catch (error) {
      console.error('Failed to fetch histogram data:', error);
    }
  };

  return (
    <Card className="w-full mt-12">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{title}</span>
          <Select onValueChange={handleFieldChange} value={currentField}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select field" />
            </SelectTrigger>
            <SelectContent>
              {fields.map((field) => (
                <SelectItem key={field} value={field}>
                  {field.replace('_', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <XAxis dataKey="x" />
            <YAxis yAxisId="left" orientation="left" stroke="#fff" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Bar yAxisId="left" dataKey="games" fill="#dc2626" name="Games" />
            <Bar yAxisId="right" dataKey="cumulative_sum" fill="#82ca9d" name="Cumulative Sum" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}