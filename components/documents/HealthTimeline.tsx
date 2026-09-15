"use client";

import { useState } from "react";
import { ChevronDown, FileImage, Syringe, FlaskConical, ClipboardList, AlertCircle } from "lucide-react";
import { MedicalDocument, DocumentKind } from "@/lib/types";
import { MetricsTable, VaccineList } from "./ExtractedMetricsPanel";
import { formatDate } from "@/lib/format";
import Badge from "@/components/ui/Badge";

const KIND_META: Record<DocumentKind, { label: string; icon: typeof Syringe }> = {
  vaccination: { label: "Vaccination record", icon: Syringe },
  prescription: { label: "Prescription", icon: ClipboardList },
  lab_report: { label: "Lab report", icon: FlaskConical },
};

export default function HealthTimeline({ documents }: { documents: MedicalDocument[] }) {
  const sorted = [...documents].sort(
    (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  );

  if (sorted.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-line bg-white px-6 py-14 text-center">
        <FileImage className="mx-auto mb-2 text-ink-soft" size={26} />
        <p className="font-display text-lg text-ink">No documents yet</p>
        <p className="mt-1 text-sm text-ink-soft">
          Upload a vaccination card or lab report above to start the timeline.
        </p>
      </div>
    );
  }

  return (
    <div className="relative pl-8">
      <div className="absolute bottom-2 left-[13px] top-2 w-px bg-line" aria-hidden />
      <div className="space-y-6">
        {sorted.map((doc) => (
          <TimelineEntry key={doc.id} doc={doc} />
        ))}
      </div>
    </div>
  );
}

function TimelineEntry({ doc }: { doc: MedicalDocument }) {
  const [open, setOpen] = useState(true);
  const { label, icon: Icon } = KIND_META[doc.kind];

  return (
    <div className="relative">
      <span className="absolute -left-8 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-paper bg-brand-100 text-brand-700">
        <Icon size={12} />
      </span>

      <div className="rounded-lg border border-line bg-white shadow-card">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-start justify-between gap-3 px-4 py-3.5 text-left"
        >
          <div className="min-w-0">
            <p className="text-xs text-ink-soft">
              {formatDate(doc.uploadedAt)} · {doc.petName}
            </p>
            <h3 className="mt-0.5 font-display text-base font-medium text-ink">{doc.title}</h3>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <Badge tone="neutral">{label}</Badge>
              {doc.status === "needs_review" && (
                <Badge tone="urgent" icon={<AlertCircle size={11} />}>
                  Needs a clearer photo
                </Badge>
              )}
              {doc.flaggedCount > 0 && doc.status !== "needs_review" && (
                <Badge tone="amber">{doc.flaggedCount} flagged</Badge>
              )}
            </div>
          </div>
          <ChevronDown
            size={18}
            className={`mt-1 shrink-0 text-ink-soft transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <div className="space-y-3 border-t border-line px-4 py-3.5">
            <p className="text-sm text-ink-soft">{doc.aiSummary}</p>
            <MetricsTable metrics={doc.metrics} />
            <VaccineList vaccines={doc.vaccines} />
            <p className="text-xs text-ink-soft/70">Source file: {doc.sourceFileName}</p>
          </div>
        )}
      </div>
    </div>
  );
}
