import db from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  const cards = await db.query.cards.findMany({
    where: (c, { like }) => like(c.name, `%${name}%`),
    limit: 10,
    columns: { id: true, name: true },
  });

  return NextResponse.json(cards);
}
