"use client";

import { useState } from "react";
import { Phone, CalendarClock, Loader2 } from "lucide-react";
import { Provider } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { createBooking } from "@/features/bookings/bookingsSlice";
import BookingConfirmModal from "./BookingConfirmModal";

const TIME_SLOTS = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM", "7:00 PM"];

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

export default function BookingPanel({ provider }: { provider: Provider }) {
  const dispatch = useAppDispatch();
  const isBooking = useAppSelector((s) => s.bookings.isBooking);

  const [petName, setPetName] = useState("Bruno");
  const [date, setDate] = useState(todayISO());
  const [time, setTime] = useState(TIME_SLOTS[0]);
  const [reason, setReason] = useState("");
  const [confirmed, setConfirmed] = useState<{ date: string; time: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      createBooking({
        providerId: provider.id,
        providerName: provider.name,
        petName,
        date,
        time,
        reason: reason.trim() || "General consultation",
      })
    ).then((action) => {
      if (createBooking.fulfilled.match(action)) {
        setConfirmed({ date, time });
      }
    });
  };

  return (
    <div className="rounded-lg border border-line bg-white p-5 shadow-card">
      <p className="text-xs uppercase tracking-wide text-ink-soft">Book a visit</p>
      <p className="mt-1 font-display text-lg font-medium text-ink">{provider.name}</p>

      <a
        href={`tel:${provider.phone.replace(/\s/g, "")}`}
        className="mt-4 flex items-center justify-center gap-2 rounded-md border border-brand-500 px-4 py-2.5 text-sm font-medium text-brand-600 transition-colors hover:bg-brand-50"
      >
        <Phone size={15} /> Call {provider.phone}
      </a>

      <div className="my-4 flex items-center gap-2 text-xs text-ink-soft">
        <span className="h-px flex-1 bg-line" />
        or request an appointment
        <span className="h-px flex-1 bg-line" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-ink-soft">Pet name</label>
          <input
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            required
            className="w-full rounded-md border border-line px-3 py-2 text-sm text-ink focus:border-brand-400 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-soft">Date</label>
            <input
              type="date"
              value={date}
              min={todayISO()}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full rounded-md border border-line px-3 py-2 text-sm text-ink focus:border-brand-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-soft">Time</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink focus:border-brand-400 focus:outline-none"
            >
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-ink-soft">
            Reason for visit (optional)
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={2}
            placeholder="e.g. Annual checkup, limping on left paw…"
            className="w-full resize-none rounded-md border border-line px-3 py-2 text-sm text-ink placeholder:text-ink-soft/60 focus:border-brand-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isBooking}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-brand-500 px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-brand-600 disabled:opacity-70"
        >
          {isBooking ? (
            <>
              <Loader2 size={15} className="animate-spin" /> Sending request…
            </>
          ) : (
            <>
              <CalendarClock size={15} /> Request appointment
            </>
          )}
        </button>
      </form>

      {confirmed && (
        <BookingConfirmModal
          providerName={provider.name}
          date={confirmed.date}
          time={confirmed.time}
          onClose={() => setConfirmed(null)}
        />
      )}
    </div>
  );
}
