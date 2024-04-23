import { db } from "@/db/db";
import { drivers, races } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function Page({ params }: { params: { ref: number } }) {
  // const [year, round] = params.ref.split("-");
  console.log(params);
  const race = await db.query.races.findFirst({
    where: eq(races.id, params.ref),
    with: {
      circuit: true,
      results: {
        with: {
          driver: true,
          constructor: true,
        }
      },
    }
  });

  return (
    <div className="container py-12">
      <h1 className="text-4xl">Race!</h1>
      <p>Results of the {race.year} {race.name}</p>
      <div className="grid gap-y-4">
        {race?.results.map(result => (
          <article key={result.id} className="p-4 border border-zinc-400 rounded">
            <div className="inline-block px-3 py-1 bg-zinc-200 font-sans rounded mb-4">{result.position ? `P${result.position}` : result.positionText}</div>
            <h2 className="text-2xl">{result.driver?.forename} {result.driver?.surname}</h2>
            <p>Time: {result.time}</p>
            <p>Driver's fastest lap: {result.fastestLapTime}</p>
          </article>
        ))}
      </div>
      <pre>{JSON.stringify(race, null, 4)}</pre>
    </div>
  );
}
