"use client";

export default function StepContact({ data, onChange, onBack, onNext }: any) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          Contact Information
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Add primary contact details
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4">
        {/* First + Last Name */}
        <div className="grid grid-cols-2 gap-3">
          <input
            className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="First Name"
            value={data.firstName || ""}
            onChange={(e) =>
              onChange({ ...data, firstName: e.target.value })
            }
          />
          <input
            className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Last Name"
            value={data.lastName || ""}
            onChange={(e) =>
              onChange({ ...data, lastName: e.target.value })
            }
          />
        </div>

        {/* Email */}
        <div>
          <input
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Email *"
            value={data.email || ""}
            onChange={(e) =>
              onChange({ ...data, email: e.target.value })
            }
          />
        </div>

        {/* Job Title */}
        <input
          className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          placeholder="Job Title"
          value={data.jobTitle || ""}
          onChange={(e) =>
            onChange({ ...data, jobTitle: e.target.value })
          }
        />

        {/* Phone */}
        <input
          className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          placeholder="Phone"
          value={data.phone || ""}
          onChange={(e) =>
            onChange({ ...data, phone: e.target.value })
          }
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          className="w-1/2 border border-slate-200 text-slate-700 rounded-lg py-2.5 text-sm font-medium hover:bg-slate-50 transition"
        >
          ← Back
        </button>

        <button
          onClick={onNext}
          disabled={!data.email}
          className="w-1/2 bg-blue-600 text-white rounded-lg py-2.5 text-sm font-medium shadow-sm hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  );
}