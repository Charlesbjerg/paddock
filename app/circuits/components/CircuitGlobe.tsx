"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SelectCircuit } from "@/db/schema";
import Globe from "react-globe.gl";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

export default function CircuitGlobe({
  circuits,
}: {
  circuits: any;
}) {
  const router = useRouter();

  const markerSvg = `
    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.5rem" width="1.5rem" xmlns="http://www.w3.org/2000/svg"><path d="M339 99a83 83 0 1 0-102 80.8V464l19 32 19-32V179.8A83.28 83.28 0 0 0 339 99zm-59-6a21 21 0 1 1 21-21 21 21 0 0 1-21 21z"></path></svg>
  `;

  const circuitsWithPositions = useMemo(() => {
    return circuits.map((circuit: SelectCircuit) => {
      return {
        ...circuit,
        size: 20,
        color: ["#fff", "#fff"][Math.round(Math.random() * 3)],
      };
    });
  }, [circuits]);

  const [activeCircuit, setActivePin] = useState<any | null>(null);
  const globeColumn = useRef<HTMLDivElement>(null);

  return (
    <div className="grid grid-cols-4">
      <div className="col-span-3" ref={globeColumn}>
        {typeof window !== "undefined" && (
          <Globe
            showGraticules
            width={globeColumn?.current?.clientWidth ?? 1000}
            // globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            htmlElementsData={circuitsWithPositions}
            htmlElement={(circuit: any) => {
              const el = document.createElement("div");
              el.innerHTML = markerSvg;
              el.style.color = circuit.color;
              el.style.width = `${circuit.size}px`;
              el.style.cursor = "pointer";
              el.style.pointerEvents = "auto";
              el.onclick = () =>
                router.push(`/circuits/${circuit.circuitRef}`, {
                  scroll: false,
                });
              el.onmouseenter = () => setActivePin(circuit);
              return el;
            }}
          />
        )}
      </div>
      <aside className="w-full">
        <div className="px-8 py-12">
          {activeCircuit && (
            <>
              <h2 className="mb-4 text-2xl">{activeCircuit.name}</h2>
              <p className="mb-4 flex items-center gap-2">
                <MapPinIcon width={20} height={20} />
                {activeCircuit.country}
              </p>
              <p className="mb-4">
                This track has hosted {activeCircuit.races.length} races.
              </p>
              <Button>View More Information</Button>
              {/* <pre>{JSON.stringify(activeCircuit, null, 4)}</pre> */}
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
