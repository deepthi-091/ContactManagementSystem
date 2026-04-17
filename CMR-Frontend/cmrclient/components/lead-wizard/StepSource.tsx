// components/lead-wizard/StepSource.tsx
"use client";

export default function StepSource({ data, onChange, onBack, onSave }: any) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Source & Notes</h2>

      <select
        className="w-full border rounded-md px-3 py-2"
        value={data.leadSource || ""}
        onChange={(e) => onChange({ ...data, leadSource: e.target.value })}
      >
        <option value="">Select Lead Source</option>
        <option>Inbound form</option>
        <option>Outbound reach</option>
        <option>Referral</option>
        <option>Event/Webinar</option>
        <option>Content/Blog</option>
        <option>Paid ad</option>
        <option>LinkedIn</option>
        <option>Other</option>
      </select>

      <textarea
        className="w-full border rounded-md px-3 py-2"
        rows={4}
        placeholder="Notes"
        value={data.notes || ""}
        onChange={(e) => onChange({ ...data, notes: e.target.value })}
      />

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="w-1/2 border rounded-md py-2"
        >
          ← Back
        </button>
        <button
          onClick={onSave}
          className="w-1/2 bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700"
        >
          Save Lead
        </button>
      </div>
    </div>
  );
}