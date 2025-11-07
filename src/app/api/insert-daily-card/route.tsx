import { NextResponse } from "next/server";
import { Card } from "../card/card.interface";
import db from "@/db";
import { cards } from "@/db/schema";
import { cardBlacklist } from "../card-blacklist";

export async function insertDailyCard() {
  try {
    let newCard: Card | null = null;
    while (newCard === null) {
      const response = await fetch("https://api.scryfall.com/cards/random");
      if (!response.ok) {
        return NextResponse.json(
          { error: "Failed to fetch card" },
          { status: 500 }
        );
      }
      const card: Card = await response.json();

      // Check if the card already exists in the database (by Scryfall ID)
      const existing = await db.query.cards.findFirst({
        where: (cardTable, { eq }) => eq(cardTable.id, card.id),
      });

      const isOnBlacklist = cardBlacklist.includes(card.name.toLowerCase());

      if (!existing && !isOnBlacklist) {
        newCard = card;
      }
    }

    // Insert the card into the database
    const savedCard = await db.insert(cards).values(newCard).returning();

    return NextResponse.json(
      { message: "Card inserted", card: savedCard },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST() {
  return insertDailyCard();
}
