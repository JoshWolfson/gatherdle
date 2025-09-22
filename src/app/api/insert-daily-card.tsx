import { NextResponse } from "next/server";
import { Card } from "./card/card.interface";
import db from "@/db";

export async function POST() {
  try {
    // Fetch a random card from Scryfall
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

    if (existing) {
      return NextResponse.json(
        { message: "Card already exists", card: existing },
        { status: 200 }
      );
    }

    // Insert the card into the database
    const newCard = await db.insert().values(card).returning();

    return NextResponse.json(
      { message: "Card inserted", card: newCard },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
