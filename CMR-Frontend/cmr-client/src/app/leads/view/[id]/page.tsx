"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getLeadById } from "@/services/contactService";
import { Lead } from "@/types/lead.types";
import Loader from "@/components/core/Loader";
import { Button } from "@/components/share/Button";

export default function ViewLeadPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) fetchLead();
  }, [id]);

  const fetchLead = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getLeadById(id);
      setLead(data);
    } catch (err) {
      setError("Unable to load lead details.");
      setLead(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        {error}
      </div>
    );

  if (!lead)
    return (
      <div className="text-center text-gray-500 mt-10">
        Lead not found
      </div>
    );

  return (
  <div className="min-h-screen bg-gray-50 py-10">
    <div className="max-w-5xl mx-auto px-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            onClick={() => router.push("/leads")}
            className="bg-orange-100 text-orange-700 hover:bg-orange-200"
          >
            ← Back
          </Button>

          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Lead Details
            </h1>
            <p className="text-sm text-gray-500">
              Detailed information about selected lead
            </p>
          </div>
        </div>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white rounded-2xl shadow-lg border border-orange-100 transition hover:shadow-xl overflow-hidden">
        {/* CARD HEADER */}
        <div className="px-6 py-4 bg-gradient-to-r from-orange-50 to-white border-b">
          <h2 className="text-lg font-semibold text-orange-700">
            Overview
          </h2>
        </div>

        <div className="p-6 space-y-8">
          {/* COMPANY INFO */}
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-orange-600 mb-4">
              Company Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
              <Info label="Company Name" value={lead.companyName} />
              <Info label="Website" value={lead.website} />
              <Info label="City" value={lead.city} />
              <Info label="Country" value={lead.country} />
              <Info label="Industry" value={lead.industry} />
              <Info label="Employee Count" value={lead.employeeCount} />
            </div>
          </section>

          {/* CONTACT INFO */}
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-orange-600 mb-4">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
              <Info label="First Name" value={lead.firstName} />
              <Info label="Last Name" value={lead.lastName} />
              <Info label="Email" value={lead.email} />
              <Info label="Phone" value={lead.phone} />
              <Info label="Job Title" value={lead.jobTitle} />
            </div>
          </section>

          {/* SOURCE & NOTES */}
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-orange-600 mb-4">
              Source & Notes
            </h3>
            <div className="space-y-4 text-sm">
              <Info label="Lead Source" value={lead.leadSource} />

              <div>
                <p className="text-gray-500 mb-1">Notes</p>
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 whitespace-pre-wrap text-gray-800 transition hover:border-orange-300">
                  {lead.notes ? lead.notes : "—"}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* FOOTER HELP TEXT */}
      <div className="mt-6 text-center text-sm text-gray-400">
        Lead information is read‑only on this page
      </div>
    </div>
  </div>
);
}

/* ✅ Helper component */
function Info({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p className="text-gray-500">{label}</p>
      <p className="font-medium">
        {value ? value : <span className="text-gray-400">—</span>}
      </p>
    </div>
  );
}