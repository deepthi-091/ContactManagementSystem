"use client";

export default function StepCompany({
  data,
  onChange,
  onNext,
}: {
  data: any;
  onChange: (v: any) => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Company information
        </h2>
        <p className="text-sm text-slate-500">
          Add company details to continue onboarding
        </p>
      </div>

      {/* Card Section */}
      <div className="space-y-6 rounded-3xl border border-slate-200/70 bg-white/80 backdrop-blur-xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
        
        {/* Company Name */}
        <div className="space-y-2">
          <label className="text-xs font-medium tracking-wide text-slate-500 uppercase">
            Company name <span className="text-red-500">*</span>
          </label>
          <input
            value={data.companyName || ""}
            onChange={(e) =>
              onChange({ ...data, companyName: e.target.value })
            }
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm transition
            placeholder:text-slate-300
            focus:border-[#1e90ff]
            focus:ring-4 focus:ring-[#1e90ff]/10
            hover:border-slate-300"
            placeholder="Acme Technologies"
          />
        </div>

        {/* Website */}
        <div className="space-y-2">
          <label className="text-xs font-medium tracking-wide text-slate-500 uppercase">
            Website
          </label>
          <input
            value={data.website || ""}
            onChange={(e) =>
              onChange({ ...data, website: e.target.value })
            }
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm transition
            placeholder:text-slate-300
            focus:border-[#1e90ff]
            focus:ring-4 focus:ring-[#1e90ff]/10
            hover:border-slate-300"
            placeholder="https://example.com"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-500 uppercase">
              City
            </label>
            <input
              value={data.city || ""}
              onChange={(e) =>
                onChange({ ...data, city: e.target.value })
              }
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm transition
              placeholder:text-slate-300
              focus:border-[#1e90ff]
              focus:ring-4 focus:ring-[#1e90ff]/10
              hover:border-slate-300"
              placeholder="Bengaluru"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-500 uppercase">
              Country
            </label>
            <input
              value={data.country || ""}
              onChange={(e) =>
                onChange({ ...data, country: e.target.value })
              }
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm transition
              placeholder:text-slate-300
              focus:border-[#1e90ff]
              focus:ring-4 focus:ring-[#1e90ff]/10
              hover:border-slate-300"
              placeholder="India"
            />
          </div>
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-500 uppercase">
            Industry
          </label>
          <select
            value={data.industry || ""}
            onChange={(e) =>
              onChange({ ...data, industry: e.target.value })
            }
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm transition
            text-slate-700
            focus:border-[#1e90ff]
            focus:ring-4 focus:ring-[#1e90ff]/10
            hover:border-slate-300"
          >
            <option value="">Select industry</option>
            <option>SaaS</option>
            <option>Fintech</option>
            <option>Healthcare</option>
            <option>E-commerce</option>
            <option>Other</option>
          </select>
        </div>

        {/* Employee Count */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-500 uppercase">
            Employee count
          </label>
          <select
            value={data.employeeCount || ""}
            onChange={(e) =>
              onChange({ ...data, employeeCount: e.target.value })
            }
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm transition
            text-slate-700
            focus:border-[#1e90ff]
            focus:ring-4 focus:ring-[#1e90ff]/10
            hover:border-slate-300"
          >
            <option value="">Select size</option>
            <option>10-50</option>
            <option>51-100</option>
            <option>101-250</option>
            <option>250+</option>
          </select>
        </div>
      </div>

      {/* Action */}
      <button
        onClick={onNext}
        disabled={!data.companyName}
        className="w-full rounded-full bg-gradient-to-r from-[#1e90ff] to-[#0077e6]
        py-3 text-sm font-semibold text-white shadow-lg
        transition duration-200
        hover:shadow-xl hover:scale-[1.01]
        active:scale-[0.98]
        disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue →
      </button>
    </div>
  );
}