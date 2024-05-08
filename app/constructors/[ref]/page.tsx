import { db } from "@/db/db";
import { qualifyingResults } from "@/db/schema";
import { sql } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function page({ params } : { params: { ref: string }}) {

    const constructor = await db.query.constructors.findFirst({
        where: (constructors, { eq }) => eq(constructors.constructorRef, params.ref),
    });

    if (!constructor) {
        notFound();
    }

    const races = await db.execute(sql`select COUNT(*) FROM results WHERE constructorId = ${constructor.id}`);

    return (
        <div className="container py-12">
            <h1>{constructor.name}</h1>
            <p>{constructor.nationality}</p>
            <pre>{JSON.stringify(constructor, null, 4)}</pre>
            <pre>{JSON.stringify(races, null, 4)}</pre>
        </div>
    )
}