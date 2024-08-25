import { getConstant } from './getConstants';

function getHeroImageUrl(heroName: string): string {
  const extractedName = heroName.replace('npc_dota_hero_', '');
  const formattedName = extractedName.toLowerCase();
  return `https://cdn.dota2.com/apps/dota2/images/heroes/${formattedName}_full.png`;
}

export async function enrichMatchData(matches: any[]) {
  const [heroes, gameModes] = await Promise.all([
    getConstant('heroes'),
    getConstant('game_mode'),
    getConstant('region'),
  ]);

  return matches.map(match => {
    const hero = heroes[match.hero_id];
    const heroName = hero?.name || 'Unknown Hero';
    return {
      ...match,
      hero_name: hero?.localized_name,
      game_mode_name: gameModes[match.game_mode]?.name.replace('game_mode_', "") || 'Unknown Game Mode',
      hero_image: getHeroImageUrl(heroName),
    };
  });
}

export async function processHeroStats(heroData: any[]) {
  const heroes = await getConstant('heroes');

  const heroStats = heroData.map(hero => ({
    ...hero,
    win_rate: hero.games > 0 ? (hero.win / hero.games) * 100 : 0,
    hero_name: heroes[hero.hero_id]?.localized_name || 'Unknown Hero',
    hero_image: getHeroImageUrl(heroes[hero.hero_id]?.name || '')
  }));

  const topHeroes = heroStats
    .filter(hero => hero.games > 5)
    .sort((a, b) => b.win_rate - a.win_rate)
    .slice(0, 5)
    .map(hero => ({
      hero_name: hero.hero_name,
      hero_image: hero.hero_image,
      games: hero.games,
      wins: hero.win,
      win_rate: hero.win_rate.toFixed(2)
    }));

  const worstAgainst = heroStats
    .sort((a, b) => (b.against_games > 5 ? b.against_win / b.against_games : 0) - 
                    (a.against_games > 5 ? a.against_win / a.against_games : 0))
    .slice(0, 5)
    .map(hero => ({
      hero_name: hero.hero_name,
      hero_image: hero.hero_image,
      against_games: hero.against_games,
      against_wins: hero.against_games - hero.against_win,
      win_rate: ((hero.against_games - hero.against_win) / hero.against_games * 100).toFixed(2)
    }));

  return { topHeroes, worstAgainst };
}