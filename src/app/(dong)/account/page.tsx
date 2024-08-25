import { ContentLayout } from "@/components/dashboard/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getRankName, getSteamId32FromEmail } from "@/lib/utils";
import { processHeroStats } from "@/utils/enrichMatchData";
import { Metadata } from 'next';
import { getServerSession } from "next-auth";
import Link from "next/link";
import { AdditionalStats } from "./AdditionalStats";
import { HeroList } from "./HeroList";
import { HistogramChart } from "./HistogramChart";
import { ProfileCard } from "./ProfileCard";
import { TotalsCard } from "./TotalsCard";
import { WinLossCard } from "./WinLossCard";

export const metadata: Metadata = {
  title: 'Account | Player Account | Turbo Dota 2',
  description: 'View your player Dota 2 Account. This is your player account as it relates to Turbo in Dota 2.',
};

async function fetchPlayerData(steamId32: string, endpoint: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/players/${steamId32}?endpoint=${endpoint}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint} data`);
  }
  return response.json();
}

async function fetchHistogramData(steamId32: string, field: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/players/${steamId32}?endpoint=histograms&field=${field}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch histogram data for ${field}`);
  }
  return response.json();
}

export default async function AccountPage() {
	const session = await getServerSession();
	if (!session?.user?.email) {
    return <div>Please log in to view your account.</div>;
  }

	const steamId32 = getSteamId32FromEmail(session.user.email);
	
	const [profile, wl, heroes, totals] = await Promise.all([
		fetchPlayerData(steamId32, 'profile'),
		fetchPlayerData(steamId32, 'wl'),
		fetchPlayerData(steamId32, 'heroes'),
		fetchPlayerData(steamId32, 'totals'),
	]);

	const { topHeroes, worstAgainst } = await processHeroStats(heroes);

	const histogramFields = ['kills', 'deaths', 'assists', 'gold_per_min', 'xp_per_min'];
  const initialHistogramData = await fetchHistogramData(steamId32, histogramFields[0]);

	return (
    <ContentLayout title="Account">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Account</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-1 pt-5 md:grid-cols-3 gap-6 mb-6">
        <ProfileCard profile={profile} rankName={getRankName(profile.rank_tier)} />
        <WinLossCard wins={wl.win} losses={wl.lose} />
        <TotalsCard totals={totals} />
      </div>
      
      <Tabs defaultValue="top-heroes" className="w-full mt-12">
        <TabsList>
          <TabsTrigger value="top-heroes">Top Heroes</TabsTrigger>
          <TabsTrigger value="worst-against">Worst Against</TabsTrigger>
          <TabsTrigger value="stats">Additional Stats</TabsTrigger>
        </TabsList>
        <TabsContent value="top-heroes">
          <HeroList
            title="5 Heroes You Don't Suck On"
            heroes={topHeroes}
            renderStats={(hero) => (
							<>
								<p className="font-medium">{hero.win_rate}% Win Rate</p>
								<p>{hero.games} total, {hero.wins} wins</p>
							</>
            )}
          />
        </TabsContent>
        <TabsContent value="worst-against">
          <HeroList
            title="5 Heroes You're Trash Against"
            heroes={worstAgainst}
            renderStats={(hero) => (
							<>
								<p className="font-medium">{hero.win_rate}% Win Rate</p>
								<p>{hero.against_games} games, {hero.against_wins} wins</p>
							</>
            )}
          />
        </TabsContent>
        <TabsContent value="stats">
          <AdditionalStats totalGames={wl.win + wl.lose} totals={totals} />
        </TabsContent>
      </Tabs>
			<HistogramChart
				title="Performance Histogram"
				initialData={initialHistogramData}
				fields={histogramFields}
			/>
    </ContentLayout>
  );
}