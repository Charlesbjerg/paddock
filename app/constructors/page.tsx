import { Button } from '@/components/ui/button';
import { db } from '@/db/db'
import Link from 'next/link';

export default async function page() {

  const constructors = await db.query.constructors.findMany({
    orderBy: (constructors, { asc }) => [asc(constructors.name)],
  });

  return (
    <div className="container py-12">
      <div className="grid grid-cols-3 gap-6">
        {constructors.map((constructor) => (
          <article key={constructor.id} className="p-6 rounded shadow bg-gray-200">
            <p>{constructor.name}</p>
            <p className="mb-4">{constructor.nationality}</p>
            <Button>
              <Link href={`/constructors/${constructor.id}`}>
                View more info on {constructor.name}
              </Link>
            </Button>
          </article>
        ))}
      </div>
    </div>
  )
}
