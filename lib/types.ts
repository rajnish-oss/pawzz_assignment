export type ProviderCategory = "vet" | "clinic24" | "ambulance" | "ngo";

export type Species = "dog" | "cat" | "bird" | "exotic" | "livestock";

export interface OperatingHours {
  day: string;
  open: string;
  close: string;
  isToday?: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  petType?: Species;
}

export interface Provider {
  id: string;
  name: string;
  category: ProviderCategory;
  lat: number;
  lng: number;
  distanceKm: number;
  address: string;
  phone: string;
  rating: number;
  reviewCount: number;
  openNow: boolean;
  is24x7: boolean;
  verified: boolean;
  speciesHandled: Species[];
  hours: OperatingHours[];
  tags: string[];
  photoTone: "sage" | "amber" | "clay" | "sand";
  reviews: Review[];
  aboutText: string;
  hasTraumaCenter?: boolean;
  ambulanceEta?: number;
}

export type DocumentKind = "vaccination" | "prescription" | "lab_report";

export type MetricFlag = "normal" | "low" | "high" | "critical";

export interface ExtractedMetric {
  id: string;
  label: string;
  value: string;
  unit: string;
  referenceRange: string;
  flag: MetricFlag;
}

export interface VaccineEntry {
  id: string;
  vaccine: string;
  dateAdministered: string;
  nextDueDate: string;
  status: "up_to_date" | "due_soon" | "overdue";
}

export type DocumentStatus = "uploading" | "processing" | "parsed" | "needs_review";

export interface MedicalDocument {
  id: string;
  petName: string;
  kind: DocumentKind;
  title: string;
  status: DocumentStatus;
  uploadedAt: string;
  sourceFileName: string;
  metrics: ExtractedMetric[];
  vaccines: VaccineEntry[];
  aiSummary: string;
  flaggedCount: number;
}

export type BookingStatus = "confirmed" | "pending" | "cancelled" | "completed";

export interface Booking {
  id: string;
  providerId: string;
  providerName: string;
  petName: string;
  date: string;
  time: string;
  reason: string;
  status: BookingStatus;
}

export interface Coordinates {
  lat: number;
  lng: number;
}
