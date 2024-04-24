import { db } from "@/db/db";
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
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";

export default async function Page({ params }: { params: { ref: string } }) {
  const driver = await db.query.drivers.findFirst({
    where: (drivers, { eq }) => eq(drivers.driverRef, params.ref),
    with: {
      results: true
    },
  });

  if (!driver) {
    notFound();
  }

  return (
    <div className="container py-12">
      <h1 className="mb-4 text-4xl">
        {driver.forename} {driver.surname}
      </h1>
      <Link
        href="/drivers"
        className="mb-4 inline-flex items-center gap-2 rounded bg-zinc-100 px-2 py-1"
      >
        <ArrowLongLeftIcon width={20} height={20} />
        Back to Drivers
      </Link>
      <Table>
        <TableCaption>{driver.results.length} Results</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Year</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Delta to P1</TableHead>
            <TableHead>Grid Position</TableHead>
            <TableHead>Position</TableHead>
            {/* <TableHead>Race Winner</TableHead> */}
            {/* <TableHead>Winning Constructor</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {driver.results.map((result) => (
            <TableRow key={result.id}>
              {/* <TableCell>{result.race.year}</TableCell> */}
              {/* <TableCell>{result.race.name}</TableCell> */}
              <TableCell>{result.time}</TableCell>
              <TableCell>{result.grid}</TableCell>
              <TableCell>{result.position}</TableCell>
              {/* <TableCell>something</TableCell> */}
              {/* <TableCell>something</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <pre>{JSON.stringify(driver, null, 4)}</pre>
    </div>
  );
}

export async function generateStaticParams() {
  const data = await db.query.drivers.findMany();
  return data.map((node) => ({
    name: node.driverRef,
  }));
}
