import { NextResponse } from 'next/server';

// Statically store and revalidate price on Vercel every 12 hours (43,200 seconds)
export const revalidate = 43200;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const roomId = searchParams.get('roomId') || '1233873689915292788';

  try {
    const res = await fetch(`https://www.airbnb.co.in/oembed?url=https://www.airbnb.co.in/rooms/${roomId}`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      },
    });

    if (!res.ok) throw new Error('Airbnb fetch failed');

    const data = await res.json();
    const titleText = data.title || '';
    const priceMatch = titleText.match(/₹\s*([\d,]+)/);

    let price = null;
    if (priceMatch && priceMatch[1]) {
      price = parseInt(priceMatch[1].replace(/,/g, ''), 10);
    }

    // Fallback to default cabin prices if scraping is currently blocked
    const fallbackPrice = roomId === '1232353131595460643' ? 4250 : 4500;

    return NextResponse.json({
      roomId,
      price: price || fallbackPrice,
      isFallback: !price,
      currency: 'INR',
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    // If Airbnb blocks the update, keep serving the fallback gracefully
    const fallbackPrice = roomId === '1232353131595460643' ? 4250 : 4500;
    return NextResponse.json({
      roomId,
      price: fallbackPrice,
      isFallback: true,
      currency: 'INR',
    });
  }
}