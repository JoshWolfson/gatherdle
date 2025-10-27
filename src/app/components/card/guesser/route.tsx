"use client";

import { useEffect, useState } from "react";

export default function GuesserInput() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    { id: string; name: string }[]
  >([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return setSuggestions([]);

    const controller = new AbortController();

    fetch(`/api/card-search?name=${encodeURIComponent(query)}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => setSuggestions(data))
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });

    return () => controller.abort();
  }, [query]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      Input Guess!
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search cards..."
        className="w-full px-3 py-2 border rounded"
      />
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 border rounded bg-white max-h-48 overflow-auto z-10">
          {suggestions.map((card) => (
            <li
              key={card.id}
              className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => {
                setSelected(card.name);
                setQuery(card.name);
                setSuggestions([]);
              }}
            >
              {card.name}
            </li>
          ))}
        </ul>
      )}
      {selected && <p className="mt-2">Selected: {selected}</p>}
    </div>
  );
}
