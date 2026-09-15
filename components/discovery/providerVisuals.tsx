import { Stethoscope, Hospital, Ambulance, HeartHandshake } from "lucide-react";
import { Provider } from "@/lib/types";

export const CATEGORY_ICON: Record<Provider["category"], typeof Stethoscope> = {
  vet: Stethoscope,
  clinic24: Hospital,
  ambulance: Ambulance,
  ngo: HeartHandshake,
};

export const TONE_GRADIENT: Record<Provider["photoTone"], string> = {
  sage: "from-brand-100 to-brand-300",
  amber: "from-amber-100 to-amber-300",
  clay: "from-urgent-100 to-urgent-300",
  sand: "from-paper-dim to-[#D9CCAE]",
};

export function ProviderThumb({
  provider,
  className = "h-20 w-20",
  iconSize = 30,
}: {
  provider: Provider;
  className?: string;
  iconSize?: number;
}) {
  const Icon = CATEGORY_ICON[provider.category];
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-md bg-gradient-to-br text-brand-800 ${TONE_GRADIENT[provider.photoTone]} ${className}`}
    >
      <Icon size={iconSize} strokeWidth={1.6} />
    </div>
  );
}
