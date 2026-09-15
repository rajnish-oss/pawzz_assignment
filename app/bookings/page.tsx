"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CalendarCheck2, Loader2, Clock3, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchBookings, cancelBooking } from "@/features/bookings/bookingsSlice";
import { Booking, BookingStatus } from "@/lib/types";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/lib/format";

const STATUS_TONE: Record<BookingStatus, "brand" | "amber" | "neutral" | "urgent"> = {
  confirmed: "brand",
  pending: "amber",
  completed: "neutral",
  cancelled: "urgent",
};

const STATUS_LABEL: Record<BookingStatus, string> = {
  confirmed: "Confirmed",
  pending: "Awaiting confirmation",
  completed: "Completed",
  cancelled: "Cancelled",
};

export default function BookingsPage() {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((s) => s.bookings);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const upcoming = items.filter((b) => b.status === "confirmed" || b.status === "pending");
  const past = items.filter((b) => b.status === "completed" || b.status === "cancelled");

  return (
    <div className="px-4 pt-6 md:px-8 md:pt-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-2xl font-medium text-ink md:text-3xl">My bookings</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Appointments you&apos;ve requested with vets, clinics, and NGOs.
        </p>

        {status === "loading" && (
          <div className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-line bg-white py-14 text-ink-soft">
            <Loader2 size={18} className="animate-spin" /> Loading bookings…
          </div>
        )}

        {status === "succeeded" && items.length === 0 && (
          <div className="mt-6 rounded-lg border border-dashed border-line bg-white px-6 py-14 text-center">
            <CalendarCheck2 className="mx-auto mb-2 text-ink-soft" size={26} />
            <p className="font-display text-lg text-ink">No bookings yet</p>
            <p className="mt-1 text-sm text-ink-soft">
              Find a vet or clinic and request an appointment to see it here.
            </p>
            <Link
              href="/"
              className="mt-4 inline-block rounded-md bg-brand-500 px-4 py-2 text-sm font-medium text-paper hover:bg-brand-600"
            >
              Discover providers
            </Link>
          </div>
        )}

        {upcoming.length > 0 && (
          <section className="mt-6">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-soft">
              Upcoming
            </p>
            <div className="space-y-3">
              {upcoming.map((b) => (
                <BookingRow key={b.id} booking={b} onCancel={() => dispatch(cancelBooking(b.id))} />
              ))}
            </div>
          </section>
        )}

        {past.length > 0 && (
          <section className="mt-6">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-soft">
              Past
            </p>
            <div className="space-y-3">
              {past.map((b) => (
                <BookingRow key={b.id} booking={b} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function BookingRow({ booking, onCancel }: { booking: Booking; onCancel?: () => void }) {
  return (
    <div className="rounded-lg border border-line bg-white p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link
            href={`/provider/${booking.providerId}`}
            className="truncate font-display text-base font-medium text-ink hover:text-brand-600"
          >
            {booking.providerName}
          </Link>
          <p className="mt-0.5 text-sm text-ink-soft">
            For {booking.petName} · {booking.reason}
          </p>
          <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-ink-soft">
            <Clock3 size={12} /> {formatDate(booking.date)} at {booking.time}
          </p>
        </div>
        <Badge tone={STATUS_TONE[booking.status]}>{STATUS_LABEL[booking.status]}</Badge>
      </div>

      {onCancel && booking.status !== "cancelled" && (
        <button
          onClick={onCancel}
          className="mt-3 flex items-center gap-1 text-xs font-medium text-ink-soft hover:text-urgent-600"
        >
          <X size={12} /> Cancel booking
        </button>
      )}
    </div>
  );
}
