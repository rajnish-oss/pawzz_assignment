"use client";

import { Siren, Loader2 } from "lucide-react";

export default function SOSButton({
  status,
  onTrigger,
}: {
  status: "idle" | "dispatching" | "ready" | "failed";
  onTrigger: () => void;
}) {
  const isDispatching = status === "dispatching";
  const isReady = status === "ready";

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onTrigger}
        disabled={isDispatching}
        className="group relative flex h-44 w-44 items-center justify-center rounded-full focus-visible:outline-offset-4 sm:h-52 sm:w-52"
        aria-label="Trigger emergency SOS"
      >
        {!isReady && (
          <span className="absolute inset-0 animate-pulseRing rounded-full bg-urgent-400" />
        )}
        <span
          className={`relative flex h-full w-full flex-col items-center justify-center gap-2 rounded-full text-paper shadow-floating transition-colors ${
            isReady ? "bg-brand-500" : "bg-urgent-400 group-hover:bg-urgent-500"
          } ${isDispatching ? "opacity-90" : ""}`}
        >
          {isDispatching ? (
            <>
              <Loader2 size={34} className="animate-spin" />
              <span className="text-sm font-medium">Locating help…</span>
            </>
          ) : isReady ? (
            <>
              <Siren size={34} />
              <span className="text-sm font-medium">Help is listed below</span>
            </>
          ) : (
            <>
              <Siren size={40} />
              <span className="font-display text-lg font-medium">SOS</span>
              <span className="text-xs text-paper/85">Tap for emergency</span>
            </>
          )}
        </span>
      </button>
    </div>
  );
}
