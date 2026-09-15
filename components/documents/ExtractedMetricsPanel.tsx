import { ExtractedMetric, MetricFlag, VaccineEntry } from "@/lib/types";
import { formatDate } from "@/lib/format";
import { AlertTriangle, CheckCircle2, AlertCircle } from "lucide-react";

const FLAG_STYLES: Record<MetricFlag, string> = {
  normal: "text-brand-600",
  low: "text-amber-600",
  high: "text-amber-600",
  critical: "text-urgent-600",
};

const FLAG_ICON: Record<MetricFlag, typeof CheckCircle2> = {
  normal: CheckCircle2,
  low: AlertTriangle,
  high: AlertTriangle,
  critical: AlertCircle,
};

export function MetricsTable({ metrics }: { metrics: ExtractedMetric[] }) {
  if (metrics.length === 0) return null;
  return (
    <div className="overflow-hidden rounded-md border border-line">
      <table className="w-full text-left text-sm">
        <thead className="bg-paper-dim text-xs text-ink-soft">
          <tr>
            <th className="px-3 py-2 font-medium">Indicator</th>
            <th className="px-3 py-2 font-medium">Value</th>
            <th className="hidden px-3 py-2 font-medium sm:table-cell">Reference range</th>
            <th className="px-3 py-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((m, i) => {
            const Icon = FLAG_ICON[m.flag];
            return (
              <tr key={m.id} className={i % 2 === 1 ? "bg-paper/60" : ""}>
                <td className="px-3 py-2 text-ink">{m.label}</td>
                <td className="whitespace-nowrap px-3 py-2 font-medium text-ink">
                  {m.value} <span className="font-normal text-ink-soft">{m.unit}</span>
                </td>
                <td className="hidden px-3 py-2 text-ink-soft sm:table-cell">{m.referenceRange}</td>
                <td className={`px-3 py-2 ${FLAG_STYLES[m.flag]}`}>
                  <span className="inline-flex items-center gap-1 font-medium capitalize">
                    <Icon size={13} /> {m.flag}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const VACCINE_STATUS_LABEL: Record<VaccineEntry["status"], { label: string; className: string }> = {
  up_to_date: { label: "Up to date", className: "text-brand-600" },
  due_soon: { label: "Due soon", className: "text-amber-600" },
  overdue: { label: "Overdue", className: "text-urgent-600" },
};

export function VaccineList({ vaccines }: { vaccines: VaccineEntry[] }) {
  if (vaccines.length === 0) return null;
  return (
    <div className="divide-y divide-line rounded-md border border-line">
      {vaccines.map((v) => (
        <div key={v.id} className="flex items-center justify-between gap-3 px-3 py-2.5 text-sm">
          <div>
            <p className="font-medium text-ink">{v.vaccine}</p>
            <p className="text-xs text-ink-soft">Given {formatDate(v.dateAdministered)}</p>
          </div>
          <div className="text-right">
            <p className={`text-xs font-medium ${VACCINE_STATUS_LABEL[v.status].className}`}>
              {VACCINE_STATUS_LABEL[v.status].label}
            </p>
            <p className="text-xs text-ink-soft">Next {formatDate(v.nextDueDate)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
