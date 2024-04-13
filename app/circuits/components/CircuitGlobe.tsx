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
  circuits: Array<SelectCircuit>;
}) {
  const router = useRouter();

  const markerSvg = `<svg viewBox="-4 0 36 36">
      <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
      <circle fill="black" cx="14" cy="14" r="7"></circle>
    </svg>`;

  const circuitsWithPositions = useMemo(() => {
    return circuits.map((circuit) => {
      return {
        ...circuit,
        size: 20,
        color: ["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
      };
    });
  }, [circuits]);

  const [activeCircuit, setActivePin] = useState<SelectCircuit | null>(null);

  useEffect(() => {
    console.log(`Active pin changed to ${activeCircuit}`);
  }, [activeCircuit]);

  const globeColumn = useRef<HTMLDivElement>(null);

  return (
    <div className="grid grid-cols-4">
      <div className="col-span-3" ref={globeColumn}>
        {window && (
          <Globe
            showGraticules
            width={globeColumn?.current?.clientWidth ?? 500}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
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
