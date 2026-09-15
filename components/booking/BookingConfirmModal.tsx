"use client";

import { CheckCircle2, X } from "lucide-react";
import Link from "next/link";

export default function BookingConfirmModal({
  providerName,
  date,
  time,
  onClose,
}: {
  providerName: string;
  date: string;
  time: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 sm:items-center">
      <div className="relative w-full max-w-sm animate-riseIn rounded-xl bg-white p-6 text-center shadow-floating">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-ink-soft hover:text-ink"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-500">
          <CheckCircle2 size={26} />
        </span>
        <h2 className="mt-3 font-display text-lg font-medium text-ink">Request sent</h2>
        <p className="mt-1 text-sm text-ink-soft">
          {providerName} will confirm your appointment on {date} at {time}. You&apos;ll get a
          notification once it&apos;s confirmed.
        </p>
        <div className="mt-5 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 rounded-md border border-line px-4 py-2 text-sm font-medium text-ink-soft hover:text-ink"
          >
            Stay on page
          </button>
          <Link
            href="/bookings"
            className="flex-1 rounded-md bg-brand-500 px-4 py-2 text-sm font-medium text-paper hover:bg-brand-600"
          >
            View bookings
          </Link>
        </div>
      </div>
    </div>
  );
}
