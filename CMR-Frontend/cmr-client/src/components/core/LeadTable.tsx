'use client';

import { Lead } from '@/types/lead.types';
import { deleteLead } from '@/services/contactService';
import { useRouter } from 'next/navigation';
import { useSnackbar } from '@/components/core/Snackbar';
import { Button } from '@/components/share/Button';
import { Eye, Pencil, Trash2 } from "lucide-react";
interface Props {
  data: Lead[];
  onRefresh: () => void;
}

export default function LeadTable({ data, onRefresh }: Props) {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  const handleDelete = async (id: string) => {
    try {
      await deleteLead(id);
      onRefresh();
      showSnackbar('Lead deleted successfully ✅', 'success');
    } catch {
      showSnackbar('Failed to delete lead ❌', 'error');
    }
  };


return (
    <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
      <table className="w-full text-sm text-slate-700">
        {/* HEADER */}
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="text-left px-4 py-2.5 font-medium text-slate-600">
              Company
            </th>
            <th className="text-left px-4 py-2.5 font-medium text-slate-600">
              Email
            </th>
            <th className="text-left px-4 py-2.5 font-medium text-slate-600">
              Actions
            </th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {data.length === 0 && (
            <tr>
              <td
                colSpan={3}
                className="text-center py-6 text-slate-400"
              >
                No leads found
              </td>
            </tr>
          )}

          {data.map((lead) => (
            <tr
              key={lead.id}
              className="border-b last:border-b-0 hover:bg-slate-50 transition"
            >
              <td className="px-4 py-2.5 font-medium text-slate-800">
                {lead.companyName}
              </td>
              <td className="px-4 py-2.5 text-slate-600">
                {lead.email}
              </td>

              {/* ACTIONS */}
              <td className="px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  {/* View */}
                  <button
                    onClick={() =>
                      router.push(`/leads/view/${lead.id}`)
                    }
                    title="View Lead"
                    className="p-1.5 rounded-md text-indigo-600 hover:bg-indigo-50 transition"
                  >
                    <span className="material-icons text-[16px]">
                      visibility
                    </span>
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() =>
                      router.push(`/leads/edit/${lead.id}`)
                    }
                    title="Edit Lead"
                    className="p-1.5 rounded-md text-emerald-600 hover:bg-emerald-50 transition"
                  >
                    <span className="material-icons text-[16px]">
                      edit
                    </span>
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(lead.id!)}
                    title="Delete Lead"
                    className="p-1.5 rounded-md text-red-600 hover:bg-red-50 transition"
                  >
                    <span className="material-icons text-[16px]">
                      delete
                    </span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

}