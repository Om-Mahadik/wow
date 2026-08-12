// app/api/airbnb-calendar/route.ts
import { NextResponse } from 'next/server';
import ICAL from 'ical.js';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // Default to a fallback test or pass your actual Airbnb ICAL feed URL
  const icalUrl = searchParams.get('icalUrl') || '';

  if (!icalUrl) {
    return NextResponse.json(
      { error: 'Missing icalUrl query parameter', blockedDates: [] },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(icalUrl, {
      next: { revalidate: 3600 }, // Cache calendar feed for 1 hour
    });

    if (!res.ok) throw new Error('Failed to fetch Airbnb iCal feed');

    const CalData = await res.text();
    const jcalData = ICAL.parse(CalData);
    const comp = new ICAL.Component(jcalData);
    const vevents = comp.getAllSubcomponents('vevent');

    const blockedDates: string[] = [];

    vevents.forEach((event) => {
      const vevent = new ICAL.Event(event);
      let startDate = vevent.startDate.toJSDate();
      const endDate = vevent.endDate.toJSDate();

      // Loop through all dates between Start and End and store YYYY-MM-DD
      const current = new Date(startDate);
      while (current < endDate) {
        blockedDates.push(current.toISOString().split('T')[0]);
        current.setDate(current.getDate() + 1);
      }
    });

    return NextResponse.json({ blockedDates, success: true });
  } catch (error: any) {
    console.error('iCal parse error:', error?.message);
    return NextResponse.json(
      { error: 'Failed to parse iCal feed', blockedDates: [] },
      { status: 500 }
    );
  }
}