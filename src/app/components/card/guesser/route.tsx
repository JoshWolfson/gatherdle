"use client";

import { useEffect, useState } from "react";

interface GuesserInputProps {
  setSelected: (value: string | null) => void;
  guessCount: number;
  setGuessCount: (value: number) => void;
}

export default function GuesserInput({
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
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();

      // If a suggestion is highlighted, select it
      if (highlightIndex >= 0 && suggestions[highlightIndex]) {
        selectSuggestion(suggestions[highlightIndex]);
      }
      // Otherwise, use the current query as the guess (if it's not empty)
      else if (query.trim() !== "") {
        selectSuggestion(query.trim());
      }
    } else if (e.key === "Escape") {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (card: string) => {
    setGuessCount(guessCount + 1);
    setSelected(card);
    setQuery("");
    setSuggestions([]);
    setIgnoreFetch(true);
    setHighlightIndex(-1);
  };

  return (
    <div className="relative w-full">
      <div className="flex flex-col items-center justify-center ">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIgnoreFetch(false);
          }}
          onKeyDown={(e) => handleKeyDown(e)}
          placeholder="Search cards..."
          className="w-full px-3 py-2 mt-4 border rounded"
        />
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 right-0 max-h-48 overflow-auto border bg-white border rounded shadow-md z-10 mt-1">
            {suggestions.map((card, idx) => (
              <li
                key={card}
                className={`px-3 py-2 cursor-pointer rounded ${
                  idx === highlightIndex
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black hover:bg-gray-200"
                }`}
                onClick={() => selectSuggestion(card)}
                onMouseEnter={() => {
                  setHighlightIndex(idx);
                }}
              >
                {card}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
