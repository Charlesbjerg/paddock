import { SelectRace } from "@/db/schema";
import clsx from "clsx";
import Flag from "react-world-flags";

type RaceMiniResults = {
  p1: string;
  p2: string;
  p3: string;
  fastest: {
    driver: string;
    time: string;
  };
}

export default function RaceCard({ race, circuit, circuitFlag, results }: { race: SelectRace, circuit: string, circuitFlag: string, results: RaceMiniResults}) {
  return (
    <article className="px-4 py-6 bg-white text-black rounded-lg shadow-lg shadow-transparent transition-all hover:shadow-white/30 hover:opacity-90 hover:-translate-y-1">
      <header className="flex items-center justify-between mb-4">
        <p>Round {race.round}</p>
        <div className="w-12 h-8 rounded border border-black">
          <Flag code={circuitFlag} className="w-full h-full object-cover rounded" />
        </div>
      </header>
      <h2 className="text-xl tracking-tighter">
        {race.year} {race.name}
      </h2>
      <p className="mb-4">{circuit}</p>
      <p className="mb-4">
        {race.date && formatRaceDate(race.date)} at {race.time && formatRaceStartTime(race.time)}
      </p>
      <div className="flex flex-wrap items-bottom gap-x-4 gap-y-4">
        <PodiumStep key={1} driver={results.p2} position="p2" />
        <PodiumStep key={2} driver={results.p1} position="p1" />
        <PodiumStep key={3} driver={results.p3} position="p3" />
        <FastestLap driver={results.fastest.driver} time={results.fastest.time} />
      </div>
    </article>
  );
}

function PodiumStep({
  driver,
  position,
  time,
}: {
  driver: string;
  position: "p1" | "p2" | "p3";
  time?: string;
}) {
  const classes = clsx("py-1 px-2 rounded text-center", {
    "flex-1 bg-amber-400 scale-125 origin-bottom": position === "p1",
    "flex-1 bg-amber-800 text-white": position === "p3",
    "flex-1 bg-gray-400": position === "p2",
  });

  return <span className={classes}>{driver}</span>;
}

import { LapTimerIcon } from '@radix-ui/react-icons'
import { formatLapTime, formatRaceDate, formatRaceStartTime } from "@/lib/utils";
function FastestLap({ driver, time }: { driver: string; time: string }) {
  return (
    <div className="w-full flex items-center gap-x-2 p-2 rounded bg-violet-900 text-white">
      <LapTimerIcon className="w-4 h-4" />
      <span className="flex-1 uppercase">{driver}</span>
      <span>{formatLapTime(time)}</span>
    </div>
  )
}
