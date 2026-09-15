import { Star } from "lucide-react";

export default function Rating({
  value,
  count,
  size = 13,
}: {
  value: number;
  count?: number;
  size?: number;
}) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-ink-soft">
      <Star size={size} className="fill-amber-400 text-amber-400" />
      <span className="font-medium text-ink">{value.toFixed(1)}</span>
      {typeof count === "number" && <span>({count})</span>}
    </span>
  );
}
