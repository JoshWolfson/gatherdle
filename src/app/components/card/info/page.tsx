"use client";

import { Card } from "@/app/api/card/card.interface";
import { useEffect, useState } from "react";

interface CardInfoProps {
  dailyCard: Card;
  guessCount: number;
  hideCard: boolean;
}

const capitalize = (str: string) =>
  str?.charAt(0)?.toUpperCase() + str?.slice(1);

export default function CardInfo({
  dailyCard,
  guessCount,
  hideCard,
}: CardInfoProps) {
  const [setImageSvg, setSetImageSvg] = useState<string | null>(null);

  useEffect(() => {
    fetch(dailyCard.set_uri)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((json) => setSetImageSvg(json.icon_svg_uri))
      .catch((err) => console.error("Error fetching set image:", err));
  }, [dailyCard]);

  return (
    <div className="items-start">
      <b>Set:</b> {dailyCard?.set_name}
      {setImageSvg && (
        <img
          src={setImageSvg}
          alt={`${dailyCard?.set_name ?? ""} set icon`}
          className="set-image inline w-6 h-6 ml-2 rounded-lg"
        />
      )}
      <div>
        <b>Rarity:</b> {capitalize(dailyCard?.rarity)}
      </div>
      <div>
        <b>Flavor Text:</b> {dailyCard?.flavor_text}
      </div>
      {guessCount > 0 && (
        <div>
          <b>Converted Mana Cost: </b>
          {dailyCard?.cmc}
        </div>
      )}
      {(guessCount > 1 || !hideCard) && (
        <div>
          <b>Color: </b>
          {dailyCard?.color_identity}
        </div>
      )}
      {(guessCount > 2 || !hideCard) && (
        <div>
          <b>Type: </b>
          {dailyCard?.type_line}
        </div>
      )}
      {(guessCount > 3 || !hideCard) && (
        <div className="w-full max-w-lg break-words">
          <b>Oracle Text: </b>
          {dailyCard?.oracle_text}
        </div>
      )}
    </div>
  );
}
