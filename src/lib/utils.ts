import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getSteamId32FromEmail(email: any) {
	if (!email) {
			throw new Error("Email is required");
	}

	const steamId = email.split('@')[0];
	const steamBaseline = BigInt("76561197960265728");
	const steam64 = BigInt(steamId);
	const steamId32 = (steam64 - steamBaseline).toString();

	return steamId32;
}

export function getRankName(rankTier: number | null): string {
  if (rankTier === null) return "Unranked";
  
  const medalNumber = Math.floor(rankTier / 10);
  const starNumber = rankTier % 10;
  
  const medals = [
    "Herald", "Guardian", "Crusader", "Archon", "Legend", "Ancient", "Divine", "Immortal"
  ];
  
  if (medalNumber === 8) return "Immortal";
  
  if (medalNumber >= 0 && medalNumber < medals.length) {
    return `${medals[medalNumber]}${starNumber > 0 ? ` ${starNumber}` : ''}`;
  }
  
  return "Unknown";
}

export type RankTier = 'Gigga Dong' | 'Nice Dong' | 'Standard Dong' | 'Boner' | 'Little Bony';

export function determineRank(score: number): RankTier {
  if (score > 10000) return 'Gigga Dong';
  if (score > 8000) return 'Nice Dong';
  if (score > 6000) return 'Standard Dong';
  if (score > 4000) return 'Boner';
  return 'Little Bony';
}

export function getRankImage(rank: RankTier): string {
  switch (rank) {
    case 'Gigga Dong':
      return '/medals/gigga_dong.png';
    case 'Nice Dong':
      return '/medals/nice_dong.png';
    case 'Standard Dong':
      return '/medals/standard_dong.png';
    case 'Boner':
      return '/medals/boner.png';
    case 'Little Bony':
      return '/medals/little_bony.png';
  }
}