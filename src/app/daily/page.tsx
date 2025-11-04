import CardPage from "../components/card/page";

export default function DailyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container flex flex-col items-center p-8 space-y-1 w-fit mx-auto rounded-lg">
        <CardPage />
      </div>
    </div>
  );
}
