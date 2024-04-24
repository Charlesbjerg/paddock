import DriverResultsDialog from "@/components/races/DriverResultsDialog";
import { db } from "@/db/db";
import { drivers, races } from "@/db/schema";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = 'force-static';

export default async function Page({ params }: { params: { ref: number } }) {
  const race = await db.query.races.findFirst({
    where: eq(races.id, params.ref),
    with: {
      circuit: true,
      lapTimes: true,
      pitStops: true,
      results: {
        with: {
          driver: true,
          constructor: true,
        }
      },
    }
  });

  if (!race) {
    notFound();
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl mb-12">Results of the {race.year} {race.name}</h1>
      <h2 className="text-3xl mb-4">Race Results</h2>
      <div className="grid grid-cols-2 gap-8">
        {race?.results.map(result => (
          <article key={result.id} className="p-4 border border-zinc-400 rounded even:translate-y-12">
            <div className="inline-block px-3 py-1 bg-zinc-200 font-sans rounded mb-4">{result.position ? `P${result.position}` : result.positionText}</div>
            <h2 className="text-2xl flex items-center group">
              {result.driver?.forename} {result.driver?.surname}
              <Link href={`/drivers/${result.driver?.driverRef}`} className="opacity-0 transition-all group-hover:translate-x-4 group-hover:opacity-100">
                <ArrowTopRightOnSquareIcon className="w-5 h-5" />
              </Link>
            </h2>
            <p className="mb-2 flex items-center group">
              {result.constructor?.name}
              <Link href={`/constructors/${result.constructor?.constructorRef}`} className="opacity-0 transition-all group-hover:translate-x-4 group-hover:opacity-100">
                <ArrowTopRightOnSquareIcon className="w-5 h-5" />
              </Link>
            </p>
            <p>Time: {result.time}</p>
            <p className="mb-4">Driver{`'`}s fastest lap: {result.fastestLapTime}</p>
            {result.driver && result.laps && (
                <DriverResultsDialog 
                  driver={result.driver} 
                  results={race.lapTimes.filter(time => time.driverId === result.driverId)}
                  pitStops={race.pitStops.filter(stop => stop.driverId === result.driverId)} />
            )}
          </article>
        ))}
      </div>
      <pre>{JSON.stringify(race, null, 4)}</pre>
    </div>
  );
}
