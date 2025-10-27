"use client";

import { useEffect, useState } from "react";

interface GuesserInputProps {
  selected: string | null;
  setSelected: (value: string | null) => void;
  guessCount: number;
  setGuessCount: (value: number) => void;
}

export default function GuesserInput({
  selected,
  setSelected,
  guessCount,
  setGuessCount,
}: GuesserInputProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `https://api.scryfall.com/cards/autocomplete?q=${encodeURIComponent(
            query
          )}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();
        setSuggestions(data.data ?? []); // Scryfall returns { data: [...] }
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Error fetching suggestions:", err);
        }
      }
    };

    fetchSuggestions();

    return () => controller.abort();
  }, [query]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      Input Guess!
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search cards..."
        className="w-full px-3 py-2 border rounded"
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.slice(0, 10).map((card) => (
            <li
              key={card}
              className="px-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSelected(card);
                setQuery(card);
                setSuggestions([]);
                setGuessCount(guessCount + 1);
              }}
            >
              {card}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
