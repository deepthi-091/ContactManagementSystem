"use client";

import { Button } from "@/components/share/Button";
import SelectField from "@/components/share/SelectField";
import { LEAD_SOURCES } from "../../../constants/leadSource";

export default function Step3Source({
  data,
  onChange,
  onBack,
  onSubmit,
  loading,
  submitLabel,
  
}: {
  data: any;
  onChange: (value: any) => void;
  onBack: () => void;
  onSubmit: () => void;
  loading: boolean;
  submitLabel: string; 
}) {
  return (
    <>
      <h2 className="text-lg font-semibold mb-4">
        Source & Notes
      </h2>

      {/* Lead Source */}
      <SelectField
        options={LEAD_SOURCES}
        value={data.leadSource || ""}
        onChange={(e: any) =>
          onChange({ ...data, leadSource: e.target.value })
        }
      />

      {/* Notes */}
      <textarea
        className="w-full border rounded-lg px-3 py-2 text-sm mt-3
                   focus:ring-2 focus:ring-blue-300 outline-none"
        placeholder="Notes"
        rows={4}
        value={data.notes || ""}
        onChange={(e) =>
          onChange({ ...data, notes: e.target.value })
        }
      />

      {/* Actions */}
      <div className="flex justify-between mt-6">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>

        <Button onClick={onSubmit} disabled={loading}>
          {loading ? "Saving..." : submitLabel}
        </Button>
      </div>
    </>
  );
}
