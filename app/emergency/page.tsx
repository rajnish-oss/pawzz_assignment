"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { triggerSOS, cancelSOS } from "@/features/emergency/emergencySlice";
import SOSButton from "@/components/emergency/SOSButton";
import EmergencyResponderRow from "@/components/emergency/EmergencyResponderRow";
import { PawPrint, PersonStanding, X } from "lucide-react";

type Situation = "pet" | "street";

export default function EmergencyPage() {
  const dispatch = useAppDispatch();
  const { status, responders, sosActive } = useAppSelector((s) => s.emergency);
  const locationLabel = useAppSelector((s) => s.location.label);
  const [situation, setSituation] = useState<Situation>("pet");

  return (
    <div className="px-4 pt-6 md:px-8 md:pt-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-medium text-ink md:text-3xl">
              Emergency SOS
            </h1>
            <p className="mt-1 text-sm text-ink-soft">
              For a street accident or a pet crisis — get the closest ambulances and
              trauma-ready clinics, sorted strictly by distance.
            </p>
          </div>
          {sosActive && (
            <button
              onClick={() => dispatch(cancelSOS())}
              className="flex shrink-0 items-center gap-1 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink-soft hover:border-urgent-300 hover:text-urgent-600"
            >
              <X size={13} /> Cancel
            </button>
          )}
        </div>

        {!sosActive && (
          <div className="mb-6 flex gap-2">
            {(
              [
                { id: "pet", label: "Pet crisis", icon: PawPrint },
                { id: "street", label: "Street accident", icon: PersonStanding },
              ] as const
            ).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSituation(id)}
                className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm transition-colors ${
                  situation === id
                    ? "border-urgent-400 bg-urgent-50 text-urgent-600"
                    : "border-line bg-white text-ink-soft hover:border-urgent-200"
                }`}
              >
                <Icon size={15} /> {label}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-col items-center rounded-xl border border-urgent-100 bg-gradient-to-b from-urgent-50/70 to-transparent px-6 py-10">
          <SOSButton status={status} onTrigger={() => dispatch(triggerSOS())} />
          {!sosActive && (
            <p className="mt-6 max-w-xs text-center text-sm text-ink-soft">
              We&apos;ll use your location{locationLabel ? ` near ${locationLabel}` : ""} to
              find and rank the nearest responders.
            </p>
          )}
        </div>

        {status === "ready" && (
          <div className="mt-6 animate-riseIn space-y-3">
            <p className="text-sm font-medium text-ink">
              {responders.length} responders found, closest first
              {situation === "pet" ? " for a pet emergency" : " for a street accident"}
            </p>
            {responders.map((r, i) => (
              <EmergencyResponderRow key={r.id} provider={r} rank={i + 1} />
            ))}
            <p className="pt-1 text-center text-xs text-ink-soft">
              If this is life-threatening, call your local emergency number directly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
