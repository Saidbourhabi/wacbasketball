import { createClient } from 'contentful';

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// Build an https URL from a Contentful media field, safely.
function getMediaUrl(field) {
  return field?.fields?.file?.url ? `https:${field.fields.file.url}` : '';
}

// ---------------------------------------------------------------------------
// News
// ---------------------------------------------------------------------------

function mapNewsArticle(item) {
  return {
    id: item.sys.id,
    headline: item.fields.headline,
    slug: item.fields.slug,
    image: getMediaUrl(item.fields.image),
    authorName: item.fields.authorName,
    date: item.fields.date,
    published: item.fields.published,
    content: item.fields.content,
    category: item.fields.category,
  };
}

export async function getAllNews() {
  try {
    const response = await client.getEntries({
      content_type: 'newsArticle',
      order: '-fields.date',
    });
    return response.items.map(mapNewsArticle);
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export async function getNewsBySlug(slug) {
  try {
    const response = await client.getEntries({
      content_type: 'newsArticle',
      'fields.slug': slug,
      limit: 1,
    });
    if (response.items.length === 0) return null;
    return mapNewsArticle(response.items[0]);
  } catch (error) {
    console.error('Error fetching news detail:', error);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Games
// ---------------------------------------------------------------------------

function mapGame(item) {
  return {
    id: item.sys.id,
    homeTeamName: item.fields.homeTeamName,
    homeTeamLogo: getMediaUrl(item.fields.homeTeamLogo),
    awayTeamName: item.fields.awayTeamName,
    awayTeamLogo: getMediaUrl(item.fields.awayTeamLogo),
    leagueName: item.fields.leagueName,
    week: item.fields.week,
    date: item.fields.date,
    arena: item.fields.arena,
    isHomeGame: item.fields.isHomeGame,
    ticketsUrl: item.fields.ticketsUrl || '',
    status: item.fields.status,
    homeScore: item.fields.homeScore ?? null,
    awayScore: item.fields.awayScore ?? null,
    q1Home: item.fields.q1Home ?? null,
    q1Away: item.fields.q1Away ?? null,
    q2Home: item.fields.q2Home ?? null,
    q2Away: item.fields.q2Away ?? null,
    q3Home: item.fields.q3Home ?? null,
    q3Away: item.fields.q3Away ?? null,
    q4Home: item.fields.q4Home ?? null,
    q4Away: item.fields.q4Away ?? null,
    published: item.fields.published,
  };
}

export async function getNextGame() {
  try {
    const response = await client.getEntries({
      content_type: 'game',
      'fields.published': true,
      'fields.status': 'upcoming',
      order: 'fields.date',
      limit: 1,
    });
    return response.items.length > 0 ? mapGame(response.items[0]) : null;
  } catch (error) {
    console.error('Error fetching next game:', error);
    return null;
  }
}

export async function getLastGame() {
  try {
    const response = await client.getEntries({
      content_type: 'game',
      'fields.published': true,
      'fields.status': 'finished',
      order: '-fields.date',
      limit: 1,
    });
    return response.items.length > 0 ? mapGame(response.items[0]) : null;
  } catch (error) {
    console.error('Error fetching last game:', error);
    return null;
  }
}

// Prefers the next upcoming game; falls back to the last finished one.
export async function getFeaturedGame() {
  const next = await getNextGame();
  if (next) return next;
  return await getLastGame();
}


export async function getAllGames() {
  try {
    const response = await client.getEntries({
      content_type: 'game',
      'fields.published': true,
      order: 'fields.date',
    });
    return response.items.map(mapGame);
  } catch (error) {
    console.error('Error fetching all games:', error);
    return [];
  }
}

export async function getAllStandings() {
  try {
    const response = await client.getEntries({
      content_type: 'standing',
      'fields.published': true,
      order: 'fields.position',
      limit: 100,
    });
    return response.items.map((item) => ({
      id: item.sys.id,
      position: item.fields.position,
      teamName: item.fields.teamName,
      teamLogo: getMediaUrl(item.fields.teamLogo),
      gamesPlayed: item.fields.gamesPlayed ?? 0,
      wins: item.fields.wins ?? 0,
      losses: item.fields.losses ?? 0,
      points: item.fields.points ?? 0,
    }));
  } catch (error) {
    console.error('Error fetching standings:', error);
    return [];
  }
}