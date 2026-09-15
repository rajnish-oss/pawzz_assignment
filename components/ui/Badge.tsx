import { ReactNode } from "react";

type Tone = "brand" | "amber" | "urgent" | "neutral";

const TONE_CLASSES: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-700 border-brand-100",
  amber: "bg-amber-50 text-amber-600 border-amber-100",
  urgent: "bg-urgent-50 text-urgent-600 border-urgent-100",
  neutral: "bg-paper-dim text-ink-soft border-line",
};

export default function Badge({
  children,
  tone = "neutral",
  icon,
}: {
  children: ReactNode;
  tone?: Tone;
  icon?: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${TONE_CLASSES[tone]}`}
    >
      {icon}
      {children}
    </span>
  );
}
