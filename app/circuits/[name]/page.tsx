import { db } from "@/db/db";
import { circuits, races } from "@/db/schema";
import { notFound } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { asc, desc } from "drizzle-orm";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";

export default async function Page({ params }: { params: { name: string } }) {
  const circuit = await db.query.circuits.findFirst({
    where: (circuits, { eq }) => eq(circuits.circuitRef, params.name),
    with: {
      races: {
        orderBy: [desc(races.year)],
      },
    },
  });

  if (!circuit) {
    notFound();
  }

  return (
    <div className="container py-12">
      <h1 className="mb-4 text-4xl">{circuit.name}</h1>
      <Link
        href="/circuits"
        className="mb-4 inline-flex items-center gap-2 rounded bg-zinc-100 px-2 py-1"
      >
        <ArrowLongLeftIcon width={20} height={20} />
        Back to Circuits
      </Link>
      <Table>
        <TableCaption>{circuit.races.length} Races</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Round</TableHead>
            <TableHead>Pole</TableHead>
            <TableHead>Race Winner</TableHead>
            <TableHead>Winning Constructor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {circuit.races.map((race) => (
            <TableRow key={race.id}>
              <TableCell>{race.name}</TableCell>
              <TableCell>{race.year}</TableCell>
              <TableCell>
                {race.date?.getDate()}/{race.date?.getMonth()}/
                {race.date?.getFullYear()} {race.time}
              </TableCell>
              <TableCell>{race.round}</TableCell>
              <TableCell>something</TableCell>
              <TableCell>something</TableCell>
              <TableCell>something</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <pre>{JSON.stringify(circuit, null, 4)}</pre>
    </div>
  );
}

export async function generateStaticParams() {
  const data = await db.query.circuits.findMany();
  return data.map((node) => ({
    name: node.circuitRef,
  }));
}
