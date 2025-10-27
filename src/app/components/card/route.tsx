"use client";

import { Card } from "@/app/api/card/card.interface";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import GuesserInput from "./guesser/route";

const API_URL = "/api/get-daily-card";

export default function CardPage() {
  const [dailyCard, setDailyCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hideCard, setHideCard] = useState(true);
  const [cardQuery, setCardQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    { id: string; name: string }[]
  >([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        console.log(res);
        return res.json();
      })
      .then((json) => setDailyCard(json))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading || dailyCard == undefined) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-20">Daily Card Game</h1>
      <div>Set:{dailyCard.set_name}</div>
      <div>Converted Mana Cost: {dailyCard.cmc}</div>
      <div>Color: {dailyCard.color_identity}</div>
      <GuesserInput />
      <div className="relative w-96 h-[560px]">
        <Image
          src={dailyCard?.image_uris.normal}
          alt="daily card image"
          width={400}
          height={300}
          className="rounded-lg shadow-md"
          hidden={hideCard}
        />
      </div>
    </div>
  );
}
