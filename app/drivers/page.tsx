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
import { Button } from "@/components/ui/button";

export default async function Page() {
  const drivers = await db.query.drivers.findMany();

  if (!drivers) {
    notFound();
  }

  return (
    <div className="container py-12">
      <div className="grid grid-cols-3 gap-6">
        {drivers.map((driver) => (
          <article key={driver.id} className="p-6 rounded shadow bg-gray-200">
            <p>
              {driver.forename} {driver.surname} ({driver.code})
            </p>
            {!!driver.number && <p>Car: {driver.number}</p>}
            <p>
              Born: {driver?.dob?.getDate()}/{driver?.dob?.getUTCMonth()}/
              {driver?.dob?.getFullYear()}
            </p>
            <p className="mb-4">{driver.nationality}</p>
            <Button>
              <Link href={`/drivers/${driver.driverRef}`}>
                View more info on {driver.surname}
              </Link>
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
}
