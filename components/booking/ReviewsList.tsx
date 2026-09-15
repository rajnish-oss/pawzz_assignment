import { Review } from "@/lib/types";
import Rating from "@/components/ui/Rating";
import { formatDate } from "@/lib/format";

export default function ReviewsList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <p className="text-sm text-ink-soft">
        No reviews yet — be the first to share how your visit went.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((r) => (
        <div key={r.id} className="border-b border-line pb-4 last:border-none last:pb-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-ink">{r.author}</p>
            <span className="text-xs text-ink-soft">{formatDate(r.date)}</span>
          </div>
          <div className="mt-1">
            <Rating value={r.rating} size={12} />
          </div>
          <p className="mt-1.5 text-sm text-ink-soft">{r.comment}</p>
        </div>
      ))}
    </div>
  );
}
