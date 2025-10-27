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
  const [ignoreFetch, setIgnoreFetch] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);

  useEffect(() => {
    if (!query || ignoreFetch) {
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0) setSuggestions(suggestions[highlightIndex]);
    } else if (e.key === "Escape") {
      setSuggestions([]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      Input Guess!
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIgnoreFetch(false);
        }}
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
                setIgnoreFetch(true);
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
