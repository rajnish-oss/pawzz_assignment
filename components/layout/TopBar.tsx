"use client";

import { useEffect } from "react";
import { PawPrint } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { detectCurrentLocation } from "@/features/location/locationSlice";
import LocationChip from "@/components/discovery/LocationChip";

export default function TopBar() {
  const dispatch = useAppDispatch();
  const status = useAppSelector((s) => s.location.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(detectCurrentLocation());
    }
  }, [status, dispatch]);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-line bg-paper/90 px-4 py-3 backdrop-blur md:px-8 md:py-4">
      <div className="flex items-center gap-2 md:hidden">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-500 text-paper">
          <PawPrint size={16} strokeWidth={2.25} />
        </span>
        <span className="font-display text-base font-medium text-ink">Pawzz</span>
      </div>
      <LocationChip />
    </header>
  );
}
