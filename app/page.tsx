import { db } from "@/db/db";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import LightsOutBtn from "@/components/ui/LightsOutBtn";

export default async function Home() {
  const data = await db.query.circuits.findMany();

  return (
    <main className="flex h-screen w-screen items-end fun-gradient">
      <div className="flex mx-auto mb-40 px-8 lg:px-20">
        <section className="flex-1">
          <h1 className="text-[8.25rem] font-medium mb-6">
            Paddock.
          </h1>
          <p className="text-4xl mb-2">Don{`'`}t just watch F1, analyse it.</p>
          <p className="text-4xl mb-10">The data playground for F1 fanatics.</p>
          <LightsOutBtn>Are you ready?</LightsOutBtn>
        </section>
        <figure className="w-1/3">
          <Image src="/hero-asset.jpg" 
                 width={800} 
                 height={800} 
                 className="rounded-2xl shadow-neon"
                 alt="A pink and blue neon lit formula 1 car with a chequred flag" />
        </figure>
      </div>
    </main>
  );
}
