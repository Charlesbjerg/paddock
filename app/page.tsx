import { db } from "@/db/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const data = await db.query.circuits.findMany();

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-black text-white">
      <h1 className="mb-6 text-center font-sans text-5xl font-black uppercase tracking-wider">
        The Paddock
      </h1>
      <p className="font-noto mb-10">
        Home to a collection of historical F1 data.
      </p>
      <div className="mx-auto flex w-full max-w-lg flex-wrap gap-4 rounded bg-white p-4">
        <Button>
          <Link href="/circuits">Circuits</Link>
        </Button>
        <Link href="/drivers">
          <Button>Drivers</Button>
        </Link>
        <Button>Constructors</Button>
        <Button>Races</Button>
      </div>
    </main>
  );
}
