import { ContentLayout } from "@/components/dashboard/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Metadata } from 'next';
import Link from "next/link";
import { Suspense } from 'react';
import { MedalSystemExplanation } from "./MedalSystemExplanation";
import { MMRExplanation } from "./MMRExplanation";
import { RankedList } from "./RankedList";

export const metadata: Metadata = {
  title: 'Ranked | Dong Guild Players',
  description: 'View ranked statistics for Dong Guild players',
};

export default function RankedPage() {
  return (
    <ContentLayout title="Ranked">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Ranked</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Suspense fallback={<p>Loading ranked data...</p>}>
        <RankedList />
      </Suspense>
			<MMRExplanation />
			<MedalSystemExplanation />
    </ContentLayout>
  );
}