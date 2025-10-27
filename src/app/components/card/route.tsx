"use client";

import { Card } from "@/app/api/card/card.interface";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import GuesserInput from "./guesser/route";

export default function CardPage() {
  const [dailyCard, setDailyCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hideCard, setHideCard] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [guessCount, setGuessCount] = useState(0);

  useEffect(() => {
    fetch("/api/get-daily-card")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((json) => setDailyCard(json))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selected || !dailyCard) return;

    const match = selected.toLowerCase() === dailyCard.name.toLowerCase();
    setHideCard(!match);
    console.log(
      "Selected:",
      selected,
      "Daily Card:",
      dailyCard.name,
      "hideCard:",
      hideCard,
      "guessCount:",
      guessCount
    );
  }, [selected, dailyCard, hideCard, guessCount]);

  if (loading || dailyCard == undefined) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-20">Daily Card Guessing Game</h1>
      <div>
        <b>Set:</b> {dailyCard.set_name}
      </div>
      <div>
        <b>Rarity:</b> {dailyCard.rarity}
      </div>
      <div>
        {guessCount > 0 && (
          <div>
            <b>Converted Mana Cost: </b>
            {dailyCard.cmc}
          </div>
        )}
      </div>
      <div>
        {guessCount > 1 && (
          <div>
            <b>Color: </b>
            {dailyCard.color_identity}
          </div>
        )}
      </div>
      <div>
        {guessCount > 2 && (
          <div>
            <b>Type: </b>
            {dailyCard.type_line}
          </div>
        )}
      </div>
      <GuesserInput
        selected={selected}
        setSelected={setSelected}
        guessCount={guessCount}
        setGuessCount={setGuessCount}
      />
      <div className="relative w-96 h-[560px]">
        {!hideCard && (
          <div>
            <h1 className="text-4xl font-bold justify-center items-center">
              Congrats you won!
            </h1>
            <Image
              src={dailyCard?.image_uris.normal}
              alt="daily card image"
              width={400}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
}
