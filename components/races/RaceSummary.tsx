import { db } from "@/db/db";
import { constructorResults, constructors, drivers, SelectRace } from "@/db/schema"
import { formatLapTime } from "@/lib/utils";
import { eq } from "drizzle-orm/sql";

export default async function RaceSummary({ race } : { race: any }) {

    const pole = race.qualifyingResults.find((result: any) => result.position === 1);
    const winner = race.results.find((result: any) => result.position === 1);
    const lapTimes = race.lapTimes.sort((a: any, b: any) => a.milliseconds - b.milliseconds);
    const fastestLap = lapTimes[0];
    const fastestLapDriver = await db.query.drivers.findFirst({
        where: eq(drivers.id, fastestLap.driverId)
    });
    const winningConstructor = await db.query.constructorResults.findFirst({
        where: eq(constructorResults.raceId, race.id),
        with: {
          constructor: true,
        }
    });

  return (
    <div className="bg-zinc-800 text-white p-8 rounded-xl my-8">
        <p>Pole Sitter: {pole.driver.forename} {pole.driver.surname}</p>
        <p>Race Winner: {winner.driver.forename} {winner.driver.surname}</p>
        <p>Fastest Lap: {formatLapTime(fastestLap.time)} by {fastestLapDriver?.forename} {fastestLapDriver?.surname} on lap {fastestLap.lap} in P{fastestLap.position}</p>
        {winningConstructor && <p>Winning Constructor: {winningConstructor?.constructor?.name}</p>}
    </div>
  )
}
