import { db } from "@/db/db";
import { drivers, races } from "@/db/schema";

export default async function Page({ params }: { params: { ref: string } }) {
  const [year, round] = params.ref.split("-");
  console.log(params);
  const race = await db.query.races.findMany({
    where: {
      year: parseInt(year),
      round: parseInt(round),
    },
  });

  return (
    <div>
      <p>Race!</p>
      <pre>{JSON.stringify(race)}</pre>
    </div>
  );
}
