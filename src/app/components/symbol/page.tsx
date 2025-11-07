import Image from "next/image";

interface SymbolProps {
  symbol: string;
}

export default function Symbol({ symbol }: SymbolProps) {
  return (
    <Image
      src={`/${symbol}.png`}
      className="set-image inline w-6 h-6 ml-2 rounded-lg"
      style={{ backgroundColor: "transparent" }}
      alt="test"
      width={6}
      height={6}
    />
  );
}
