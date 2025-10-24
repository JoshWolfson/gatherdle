"use client";

import { Card } from "@/app/api/card/card.interface";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const API_URL = "/api/get-daily-card";

export default function CardPage() {
  const [data, setData] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        console.log(res);
        return res.json();
      })
      .then((json) => setData(json.card[0]))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading || data == undefined) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Daily Card</h1>
      <div className="relative w-96 h-[560px]">
        <Image
          src={data?.image_uris.normal}
          alt="daily card image"
          width={400} // desired width in pixels
          height={300} // desired height in pixels
          className="rounded-lg shadow-md"
        />
      </div>
    </div>
  );
}
