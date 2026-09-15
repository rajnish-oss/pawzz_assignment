"use client";

import { useMemo } from "react";
import { Stethoscope, Hospital, Ambulance, HeartHandshake, LocateFixed } from "lucide-react";
import { Provider } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setSelectedProvider } from "@/features/providers/providersSlice";

const PIN_ICON: Record<Provider["category"], typeof Stethoscope> = {
  vet: Stethoscope,
  clinic24: Hospital,
  ambulance: Ambulance,
  ngo: HeartHandshake,
};

const PIN_COLOR: Record<Provider["category"], string> = {
  vet: "bg-brand-500",
  clinic24: "bg-urgent-400",
  ambulance: "bg-amber-500",
  ngo: "bg-brand-700",
};

export default function MapPanel({ providers }: { providers: Provider[] }) {
  const dispatch = useAppDispatch();
  const selectedId = useAppSelector((s) => s.providers.selectedProviderId);

  const positioned = useMemo(() => {
    if (providers.length === 0) return [];
    const lats = providers.map((p) => p.lat);
    const lngs = providers.map((p) => p.lng);
    const padPct = 12;
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    const latSpan = maxLat - minLat || 0.01;
    const lngSpan = maxLng - minLng || 0.01;

    return providers.map((p) => {
      const xRaw = ((p.lng - minLng) / lngSpan) * 100;
      const yRaw = 100 - ((p.lat - minLat) / latSpan) * 100;
      const x = padPct + (xRaw * (100 - padPct * 2)) / 100;
      const y = padPct + (yRaw * (100 - padPct * 2)) / 100;
      return { ...p, x, y };
    });
  }, [providers]);

  return (
    <div className="relative h-full min-h-[420px] w-full overflow-hidden rounded-lg border border-line bg-brand-50">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(#c9d9cf 1px, transparent 1px), linear-gradient(90deg, #c9d9cf 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      <div className="absolute left-[8%] top-[18%] h-40 w-52 rounded-[40%] bg-brand-100/70 blur-2xl" />
      <div className="absolute bottom-[12%] right-[10%] h-48 w-60 rounded-[45%] bg-amber-100/50 blur-2xl" />

      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <span className="relative flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-pulseRing rounded-full bg-brand-500" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-paper bg-brand-500" />
        </span>
        <span className="mt-1.5 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-medium text-brand-700 shadow-card">
          <LocateFixed size={11} /> You
        </span>
      </div>

      {positioned.map((p) => {
        const Icon = PIN_ICON[p.category];
        const isSelected = selectedId === p.id;
        return (
          <button
            key={p.id}
            onClick={() => dispatch(setSelectedProvider(p.id))}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-full transition-transform hover:-translate-y-[110%]"
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-white shadow-floating transition-transform ${
                PIN_COLOR[p.category]
              } ${isSelected ? "scale-125" : ""}`}
            >
              <Icon size={14} strokeWidth={2.2} />
            </span>
            {isSelected && (
              <span className="absolute left-1/2 top-[calc(100%+6px)] w-max max-w-[160px] -translate-x-1/2 rounded-md bg-ink px-2 py-1 text-[11px] font-medium leading-tight text-paper shadow-floating">
                {p.name}
                <span className="block font-normal text-paper/70">{p.distanceKm} km away</span>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
