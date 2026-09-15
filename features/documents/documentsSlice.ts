import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MedicalDocument } from "@/lib/types";
import { MOCK_DOCUMENTS } from "@/lib/mockData";

interface DocumentsState {
  items: MedicalDocument[];
  status: "idle" | "loading" | "succeeded" | "failed";
  uploadStatus: "idle" | "uploading" | "analyzing" | "done";
  activePetFilter: string | "all";
}

const initialState: DocumentsState = {
  items: [],
  status: "idle",
  uploadStatus: "idle",
  activePetFilter: "all",
};

// Simulates GET /api/documents — the user's parsed health timeline.
export const fetchDocuments = createAsyncThunk("documents/fetchAll", async () => {
  await new Promise((r) => setTimeout(r, 500));
  return MOCK_DOCUMENTS;
});

// Simulates POST /api/documents/upload followed by the AI vision
// pipeline running server-side (OCR + entity extraction + reference-range
// flagging). The client only uploads bytes and polls/receives the result.
export const uploadAndAnalyzeDocument = createAsyncThunk(
  "documents/uploadAndAnalyze",
  async (fileName: string) => {
    await new Promise((r) => setTimeout(r, 1400));
    const generated: MedicalDocument = {
      id: `doc-${Date.now()}`,
      petName: "Bruno",
      kind: "lab_report",
      title: "Newly Scanned Report",
      status: "parsed",
      uploadedAt: new Date().toISOString(),
      sourceFileName: fileName,
      aiSummary:
        "The AI vision model read this scan and matched the values against standard canine reference ranges. One indicator falls slightly outside the expected band.",
      flaggedCount: 1,
      metrics: [
        { id: `gm-${Date.now()}-1`, label: "ALT (Liver Enzyme)", value: "142", unit: "U/L", referenceRange: "10 – 100", flag: "high" },
        { id: `gm-${Date.now()}-2`, label: "Calcium", value: "10.1", unit: "mg/dL", referenceRange: "9.0 – 11.3", flag: "normal" },
        { id: `gm-${Date.now()}-3`, label: "Platelets", value: "260", unit: "×10⁹/L", referenceRange: "200 – 500", flag: "normal" },
      ],
      vaccines: [],
    };
    return generated;
  }
);

const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    setPetFilter(state, action: PayloadAction<string>) {
      state.activePetFilter = action.payload;
    },
    resetUploadStatus(state) {
      state.uploadStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(uploadAndAnalyzeDocument.pending, (state) => {
        state.uploadStatus = "analyzing";
      })
      .addCase(uploadAndAnalyzeDocument.fulfilled, (state, action) => {
        state.uploadStatus = "done";
        state.items.unshift(action.payload);
      })
      .addCase(uploadAndAnalyzeDocument.rejected, (state) => {
        state.uploadStatus = "idle";
      });
  },
});

export const { setPetFilter, resetUploadStatus } = documentsSlice.actions;
export default documentsSlice.reducer;
