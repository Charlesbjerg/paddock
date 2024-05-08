import { Button } from "@/components/ui/button";
import { db } from "@/db/db";
import Link from "next/link";

export default async function Page() {
  const races = await db.query.races.findMany({
    with: {
      circuit: true,
    },
  });

  return (
    <div className="container py-12">
      <h1>Races</h1>
      <div className="grid grid-cols-3 gap-6">
        {races.map((race) => (
          <article key={race.id} className="p-4 rounded shadow">
            <h2>
              {race.year} {race.name}
            </h2>
            <p>
              {race.circuit?.location}: {race.circuit?.name}
            </p>
            <Link href={`/races/${race.id}`}>
              <Button>View</Button>
            </Link>
            <pre>{JSON.stringify(race, null, 4)}</pre>
          </article>
        ))}
      </div>
    </div>
  );
}
