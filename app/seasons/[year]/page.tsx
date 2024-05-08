import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import RaceCard from "@/components/races/RaceCard";
import { getSeasonRaceResults } from "@/lib/queries";

export default async function Page({ params }: { params: { year: number } }) {

    const races = await getSeasonRaceResults(params.year);

  if (!races) {
    notFound();
  }

  return (
    <div className="container py-12">
      <h1 className="text-6xl my-12 tracking-[-0.2rem]">
        {params.year} Formula 1 Season.
      </h1>
      <div className="grid grid-cols-5 gap-6">
        {races.map((race) => (
          <RaceCard key={race.id} race={race} circuit={race.circuit} circuitFlag={race.countryCode} results={{ p1: race.p1, p2: race.p2, p3: race.p3, fastest: { time: race.fastestLap, driver: race.fastestLapDriver} }} />
        ))}
      </div>
    </div>
  );
}
