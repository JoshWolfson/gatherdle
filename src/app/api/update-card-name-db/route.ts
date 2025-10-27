import { NextResponse } from "next/server";
import db from "@/db";
import { card_names, set_names } from "@/db/schema";
import { sql } from "drizzle-orm";

function getTotalScryallSets(): number {
  return 0;
}

function getUniqueCardNamesFromScryfallSet(setName: string): string[] {
  return [];
}

function getNewCards(
  existingCardNames: string[],
  fetchedCardNames: string[]
): string[] {
  return [];
}

export async function POST() {
  const setCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(set_names);

  const scryfallSetTotal = getTotalScryallSets();

  if (setCount[0].count === scryfallSetTotal) {
    return;
  }

  const existingCardNames = await db.query.card_names.findMany({
    columns: { name: true },
    where: () => sql`1=1`,
  });

  const newCards = getNewCards(
    existingCardNames.map((c) => c.name),
    getUniqueCardNamesFromScryfallSet("setName")
  );

  await db.insert(card_names).values(newCards.map((name) => ({ name })));
}
