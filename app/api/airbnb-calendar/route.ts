// app/api/airbnb-calendar/route.ts

import { NextResponse } from "next/server";
import ICAL from "ical.js";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const icalUrl = searchParams.get("icalUrl") || "";

  // --------------------------------------------------
  // Validate URL
  // --------------------------------------------------

  if (!icalUrl) {
    return NextResponse.json(
      {
        success: false,
        error: "Missing icalUrl query parameter",
        blockedDates: [],
        events: [],
      },
      { status: 400 }
    );
  }

  try {
    // --------------------------------------------------
    // Fetch Airbnb iCal
    // --------------------------------------------------

    console.log("🏠 Fetching Airbnb iCal calendar...");

    const response = await fetch(icalUrl, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Airbnb iCal request failed: ${response.status} ${response.statusText}`
      );
    }

    const rawCalendar = await response.text();

    if (!rawCalendar.trim()) {
      throw new Error("Airbnb returned an empty iCal calendar");
    }

    console.log("✅ Airbnb iCal fetched successfully");
    console.log("📦 Raw calendar size:", rawCalendar.length);

    // --------------------------------------------------
    // Parse iCal
    // --------------------------------------------------

    const jcalData = ICAL.parse(rawCalendar);
    const calendar = new ICAL.Component(jcalData);

    const vevents = calendar.getAllSubcomponents("vevent");

    console.log(`📅 Airbnb events found: ${vevents.length}`);

    // --------------------------------------------------
    // Storage
    // --------------------------------------------------

    const blockedDates: string[] = [];

    const events: {
      uid: string | null;
      summary: string | null;
      startDate: string | null;
      endDate: string | null;
      type: "reserved" | "unavailable" | "other";
    }[] = [];

    // --------------------------------------------------
    // Helper
    // --------------------------------------------------

    const formatDate = (date: ICAL.Time): string => {
      const year = String(date.year);
      const month = String(date.month).padStart(2, "0");
      const day = String(date.day).padStart(2, "0");

      return `${year}-${month}-${day}`;
    };

    // --------------------------------------------------
    // Process every Airbnb event
    // --------------------------------------------------

    vevents.forEach((component, index) => {
      try {
        const event = new ICAL.Event(component);

        const startDate = event.startDate;
        const endDate = event.endDate;

        if (!startDate || !endDate) {
          console.warn(
            `⚠️ Event #${index + 1} has no valid start/end date`
          );

          return;
        }

        // ----------------------------------------------
        // Read summary
        // ----------------------------------------------

const summary = String(
  component.getFirstPropertyValue("summary") || ""
);

const uid = String(
  component.getFirstPropertyValue("uid") || ""
);

        // ----------------------------------------------
        // Convert dates WITHOUT timezone conversion
        // ----------------------------------------------

        const start = formatDate(startDate);
        const end = formatDate(endDate);

        // ----------------------------------------------
        // Determine event type
        // ----------------------------------------------

        let type: "reserved" | "unavailable" | "other" = "other";

        if (
          typeof summary === "string" &&
          summary.toLowerCase() === "reserved"
        ) {
          type = "reserved";
        } else if (
          typeof summary === "string" &&
          summary.toLowerCase().includes("not available")
        ) {
          type = "unavailable";
        }

        // ----------------------------------------------
        // Save event information
        // ----------------------------------------------

        events.push({
          uid,
          summary,
          startDate: start,
          endDate: end,
          type,
        });

        console.log(
          `📌 Event #${index + 1}: ${summary || "Unknown"} | ${start} → ${end}`
        );

        // ----------------------------------------------
        // Only block actual unavailable/reserved events
        // ----------------------------------------------

        if (type !== "reserved" && type !== "unavailable") {
          return;
        }

        // ----------------------------------------------
        // DTEND is EXCLUSIVE
        //
        // Example:
        //
        // DTSTART = 2026-10-02
        // DTEND   = 2026-10-04
        //
        // Block:
        // 2026-10-02
        // 2026-10-03
        //
        // Do NOT block:
        // 2026-10-04
        // ----------------------------------------------

        let current = startDate.clone();

        while (current.compare(endDate) < 0) {
          const dateString = formatDate(current);

          blockedDates.push(dateString);

          current = current.clone();
          current.day += 1;
        }
      } catch (eventError) {
        console.error(
          `❌ Failed to process Airbnb event #${index + 1}:`,
          eventError
        );
      }
    });

    // --------------------------------------------------
    // Remove duplicate dates
    // --------------------------------------------------

    const uniqueBlockedDates = [...new Set(blockedDates)].sort();

    // --------------------------------------------------
    // Separate reservation/unavailable information
    // --------------------------------------------------

    const reservedEvents = events.filter(
      (event) => event.type === "reserved"
    );

    const unavailableEvents = events.filter(
      (event) => event.type === "unavailable"
    );

    // --------------------------------------------------
    // Debug information
    // --------------------------------------------------

    console.log("\n========================================");
    console.log("🏠 AIRBNB CALENDAR RESULT");
    console.log("========================================");

    console.log("Total Airbnb events:", events.length);

    console.log("Reserved events:", reservedEvents.length);

    console.log(
      "Unavailable events:",
      unavailableEvents.length
    );

    console.log(
      "Total blocked dates:",
      uniqueBlockedDates.length
    );

    console.log("Blocked dates:");

    console.log(
      JSON.stringify(uniqueBlockedDates, null, 2)
    );

    console.log("========================================\n");

    // --------------------------------------------------
    // Return response
    // --------------------------------------------------

    return NextResponse.json({
      success: true,

      blockedDates: uniqueBlockedDates,

      events,

      summary: {
        totalEvents: events.length,
        reservedEvents: reservedEvents.length,
        unavailableEvents: unavailableEvents.length,
        totalBlockedDates: uniqueBlockedDates.length,
      },
    });
  } catch (error: unknown) {
    console.error("❌ Airbnb iCal error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Unknown error";

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch or parse Airbnb calendar",
        details: message,
        blockedDates: [],
        events: [],
      },
      { status: 500 }
    );
  }
}