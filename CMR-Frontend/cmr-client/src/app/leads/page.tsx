"use client";

import { useEffect, useState } from "react";
import { Lead } from "@/types/lead.types";
import { getLeads } from "@/services/contactService";
import { Button } from "@/components/share/Button";
import LeadTable from "@/components/core/LeadTable";
import Loader from "@/components/core/Loader";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/components/core/Snackbar";
export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filtered, setFiltered] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const { showSnackbar } = useSnackbar();

  const router = useRouter();

 const loadLeads = async () => {
  try {
    setLoading(true);

    const data = await getLeads();
    setLeads(data);
    setFiltered(data);
  } catch (error) {
    console.error("Failed to load leads:", error);
    showSnackbar("Failed to load leads ❌", "error");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    loadLeads();
  }, []);

  useEffect(() => {
    if (!search) {
      setFiltered(leads);
    } else {
      const q = search.toLowerCase();
      setFiltered(
        leads.filter(
          (l) =>
            l.companyName.toLowerCase().includes(q) ||
            l.email.toLowerCase().includes(q)
        )
      );
    }
  }, [search, leads]);

  return (
  <div className="min-h-screen bg-slate-50">
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">
            Leads
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage and track all your customer leads in one place
          </p>
        </div>

        <Button
          onClick={() => router.push("/leads/new")}
          className="mt-4 md:mt-0 px-6 py-3"
        >
          + New Lead
        </Button>
      </div>

      {/* TOOLBAR */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <input
              placeholder="Search by company or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                border border-slate-200
                rounded-lg
                pl-9 pr-4 py-2
                text-sm
                text-slate-700
                placeholder-slate-400
                bg-white
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-200
                focus:border-indigo-400
              "
            />
            <span className="absolute left-3 top-2.5 text-slate-400 text-sm">
              🔍
            </span>
          </div>

          {/* META */}
          <div className="text-sm text-slate-500">
            Total Leads:
            <span className="ml-1 font-medium text-slate-800">
              {filtered.length}
            </span>
          </div>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        {loading ? (
          <div className="p-10">
            <Loader />
          </div>
        ) : (
          <LeadTable data={filtered} onRefresh={loadLeads} />
        )}
      </div>
    </div>
  </div>
);
}