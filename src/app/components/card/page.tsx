"use client";

import { Card } from "@/app/api/card/card.interface";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import GuesserInput from "./guesser/page";
import CardInfo from "./info/page";

export default function CardPage() {
  const [dailyCard, setDailyCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hideCard, setHideCard] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [guessCount, setGuessCount] = useState(0);
  const [match, setMatch] = useState(false);
  const maxGuesses = 5;

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

    const cardMatch = selected.toLowerCase() === dailyCard.name.toLowerCase();
    const isAtMaxGuesses = guessCount >= maxGuesses;

    if (match !== cardMatch) {
      setMatch(cardMatch);
    }

    const shouldRevealCard = cardMatch || isAtMaxGuesses;

    setHideCard(!shouldRevealCard);
  }, [selected, dailyCard, guessCount, match]);

  if (loading || dailyCard == undefined) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Daily Card Guessing Game</h1>
      <CardInfo
        dailyCard={dailyCard}
        guessCount={guessCount}
        hideCard={hideCard}
      />
      {!match && guessCount < maxGuesses && (
        <GuesserInput
          setSelected={setSelected}
          guessCount={guessCount}
          setGuessCount={setGuessCount}
        />
      )}
      {!hideCard && (
        <div className="flex flex-col items-center space-y-4 mt-5">
          <div className="text-center px-4">
            {match && <h1 className="text-4xl font-bold">Congrats you won!</h1>}
            {!match && guessCount >= maxGuesses && (
              <h1 className="text-4xl font-bold">Better luck next time!</h1>
            )}
          </div>

          <div className="relative w-96 h-[560px]">
            <Image
              src={dailyCard?.image_uris.normal}
              alt="daily card image"
              width={400}
              height={300}
              className="rounded-lg shadow-md bg-[#ccc2c2]"
              style={{ backgroundColor: "#ccc2c2" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
