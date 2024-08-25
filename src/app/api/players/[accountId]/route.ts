import { NextRequest, NextResponse } from 'next/server';

const OPENDOTA_API_BASE = process.env.NEXT_PUBLIC_OPENDOTA_API_BASE;

async function fetchFromOpenDota(endpoint: string, params: URLSearchParams) {
  const url = `${OPENDOTA_API_BASE}${endpoint}?${params.toString()}&significant=0&game_mode=23`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`OpenDota API error: ${response.statusText}`);
  }
  return response.json();
}

export async function GET(
  request: NextRequest,
  { params }: { params: { accountId: string } }
) {
  const { accountId } = params;
  const searchParams = request.nextUrl.searchParams;
  const endpoint = searchParams.get('endpoint');

  if (!endpoint) {
    return NextResponse.json({ error: 'Endpoint is required' }, { status: 400 });
  }

  try {
    let data;
    switch (endpoint) {
      case 'profile':
        data = await fetchFromOpenDota(`/players/${accountId}`, searchParams);
        break;
      case 'wl':
        data = await fetchFromOpenDota(`/players/${accountId}/wl`, searchParams);
        break;
      case 'recentMatches':
        data = await fetchFromOpenDota(`/players/${accountId}/recentMatches`, searchParams);
        break;
      case 'matches':
        data = await fetchFromOpenDota(`/players/${accountId}/matches`, searchParams);
        break;
      case 'heroes':
        data = await fetchFromOpenDota(`/players/${accountId}/heroes`, searchParams);
        break;
      case 'peers':
        data = await fetchFromOpenDota(`/players/${accountId}/peers`, searchParams);
        break;
      case 'pros':
        data = await fetchFromOpenDota(`/players/${accountId}/pros`, searchParams);
        break;
      case 'totals':
        data = await fetchFromOpenDota(`/players/${accountId}/totals`, searchParams);
        break;
      case 'counts':
        data = await fetchFromOpenDota(`/players/${accountId}/counts`, searchParams);
        break;
      case 'histograms':
        data = await fetchFromOpenDota(`/players/${accountId}/histograms/${searchParams.get('field')}`, searchParams);
        break;
      case 'wardmap':
        data = await fetchFromOpenDota(`/players/${accountId}/wardmap`, searchParams);
        break;
      case 'wordcloud':
        data = await fetchFromOpenDota(`/players/${accountId}/wordcloud`, searchParams);
        break;
      case 'ratings':
        data = await fetchFromOpenDota(`/players/${accountId}/ratings`, searchParams);
        break;
      default:
        return NextResponse.json({ error: 'Invalid endpoint' }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data from OpenDota:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}