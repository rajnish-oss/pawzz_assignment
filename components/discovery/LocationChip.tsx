"use client";

import { useState } from "react";
import { MapPin, LocateFixed, Loader2, ChevronDown } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { detectCurrentLocation, setManualLocation } from "@/features/location/locationSlice";

export default function LocationChip() {
  const dispatch = useAppDispatch();
  const { status, label } = useAppSelector((s) => s.location);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");

  const submitManual = () => {
    if (draft.trim()) {
      dispatch(setManualLocation(draft.trim()));
    }
    setEditing(false);
    setDraft("");
  };

  if (editing) {
    return (
      <div className="flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5">
        <MapPin size={15} className="shrink-0 text-brand-500" />
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submitManual()}
          placeholder="Enter area or city"
          className="w-36 bg-transparent text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none sm:w-48"
        />
        <button
          onClick={submitManual}
          className="rounded-full bg-brand-500 px-2.5 py-1 text-xs font-medium text-paper"
        >
          Set
        </button>
        <button
          onClick={() => {
            setEditing(false);
            dispatch(detectCurrentLocation());
          }}
          className="text-ink-soft hover:text-brand-500"
          aria-label="Use GPS instead"
        >
          <LocateFixed size={16} />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setEditing(true)}
      className="flex max-w-[220px] items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-sm text-ink transition-colors hover:border-brand-300 sm:max-w-none"
    >
      {status === "locating" ? (
        <>
          <Loader2 size={15} className="animate-spin text-brand-500" />
          <span className="text-ink-soft">Finding you…</span>
        </>
      ) : (
        <>
          <MapPin size={15} className="shrink-0 text-brand-500" />
          <span className="truncate">{label || "Set your location"}</span>
          <ChevronDown size={14} className="text-ink-soft" />
        </>
      )}
    </button>
  );
}
