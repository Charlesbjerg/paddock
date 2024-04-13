import { db } from "@/db/db";
import CircuitGlobe from "./components/CircuitGlobe";

export default async function Page() {
  const circuits = await db.query.circuits.findMany({
    with: {
      races: true,
    },
  });

  return (
    <main>
      <CircuitGlobe circuits={circuits} />
    </main>
  );
}
