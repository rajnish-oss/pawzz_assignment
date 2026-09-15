"use client";

import { useRef, useState } from "react";
import { UploadCloud, Sparkles, CheckCircle2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { uploadAndAnalyzeDocument, resetUploadStatus } from "@/features/documents/documentsSlice";

export default function UploadDropzone() {
  const dispatch = useAppDispatch();
  const uploadStatus = useAppSelector((s) => s.documents.uploadStatus);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    dispatch(uploadAndAnalyzeDocument(file.name));
    window.setTimeout(() => dispatch(resetUploadStatus()), 3200);
  };

  const isBusy = uploadStatus === "uploading" || uploadStatus === "analyzing";

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={`relative rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors ${
        isDragging ? "border-brand-400 bg-brand-50" : "border-line bg-white"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*,application/pdf"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {uploadStatus === "done" ? (
        <div className="flex flex-col items-center gap-2 text-brand-600">
          <CheckCircle2 size={30} />
          <p className="font-medium">Added to the health timeline</p>
          <p className="text-sm text-ink-soft">Scroll down to see what the AI found.</p>
        </div>
      ) : isBusy ? (
        <div className="flex flex-col items-center gap-2">
          <span className="relative flex h-11 w-11 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-200 opacity-70" />
            <Sparkles size={22} className="relative text-brand-500" />
          </span>
          <p className="font-medium text-ink">Reading the document…</p>
          <p className="text-sm text-ink-soft">
            Extracting values and checking them against reference ranges.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-500">
            <UploadCloud size={22} />
          </span>
          <p className="font-medium text-ink">
            Upload a vaccination card, prescription, or lab report
          </p>
          <p className="max-w-sm text-sm text-ink-soft">
            A photo of a handwritten or printed document works fine — the AI cleans it up and
            files it for you.
          </p>
          <button
            onClick={() => inputRef.current?.click()}
            className="mt-2 rounded-md bg-brand-500 px-4 py-2 text-sm font-medium text-paper hover:bg-brand-600"
          >
            Choose a photo
          </button>
        </div>
      )}
    </div>
  );
}
