import { ContentLayout } from "@/components/dashboard/content-layout";
import { EggplantMeter } from "@/components/dashboard/EggplantMeter";
import PlaceholderContent from "@/components/placeholder-content";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { getSteamId32FromEmail } from "@/lib/utils";
import { Metadata } from 'next';
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Suspense } from 'react';
import { MatchList } from './MatchList';

export const metadata: Metadata = {
  title: 'Dashboard | Player Overview | Turbo Dota 2',
  description: 'View your player Dota 2 dashboard. This is a basic overview of your player information as it relates to Turbo in Dota 2.',
};

async function fetchRecentMatches(steamId32: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/players/${steamId32}?endpoint=recentMatches`);
  if (!response.ok) {
    throw new Error('Failed to fetch recent matches');
  }
  return response.json();
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page, 10) : 1;
	const session = await getServerSession();
  if (!session?.user?.email) {
    return <div>Please log in to view your dashboard.</div>;
  }

  const steamId32 = getSteamId32FromEmail(session.user.email);

	const [recentMatches] = await Promise.all([
    fetchRecentMatches(steamId32),
  ]);


  return (
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* <PlaceholderContent /> */}
			<div className="mb-6">
        <EggplantMeter recentMatches={recentMatches} />
      </div>
      <Suspense fallback={<p>Loading matches...</p>}>
        <MatchList initialPage={page} />
      </Suspense>
    </ContentLayout>
  );
}