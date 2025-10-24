import { NextResponse } from "next/server";
import db from "@/db";
import { Card } from "../card/card.interface";
import { insertDailyCard } from "../insert-daily-card/route";
import { sql } from "drizzle-orm";

// Helper to get today's date in YYYY-MM-DD format
function getTodayDateString() {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

export async function GET() {
  const today = getTodayDateString();
  const startOfToday = new Date(today);
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date(today);
  endOfToday.setHours(23, 59, 59, 999);

  // Try to find today's card
  const card = await db.query.cards.findFirst({
    where: (cards) => sql`DATE(${cards.created_at}) = ${today}`,
  });

  if (card) {
    return NextResponse.json(card);
  }

  // If not found, call the insert-daily-card route
  const res = await insertDailyCard();

  const newCard: Card = await res.json();
  return NextResponse.json(newCard);
}
