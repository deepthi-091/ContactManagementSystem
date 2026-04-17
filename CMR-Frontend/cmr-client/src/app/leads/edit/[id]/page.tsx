'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getLeadById } from '@/services/contactService';
import LeadWizard from '@/components/core/LeadWizard/LeadWizard';
import Loader from '@/components/core/Loader';
import { Lead } from '@/types/lead.types';
import { useSnackbar } from '@/components/core/Snackbar';
import { Button } from '@/components/share/Button';

export default function EditLeadPage() {
  const { id } = useParams();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) loadLead();
  }, [id]);

  const loadLead = async () => {
    try {
      setLoading(true);
      const data = await getLeadById(id as string);
      setLead(data);
      showSnackbar('Lead loaded successfully ✅', 'success');
    } catch (error) {
      console.error('Failed to load lead', error);
      showSnackbar('Failed to load lead ❌', 'error');
    } finally {
      setLoading(false);
    }
  };

  /* ✅ LOADING STATE */
  if (loading) {
    return <Loader />;
  }

  /* ✅ NOT FOUND STATE */
  if (!lead) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Lead not found
      </div>
    );
  }

  /* ✅ SUCCESS STATE */
  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header with Back button */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="primary"
          size="sm"
          onClick={() => router.push('/leads')}
        >
          ← Back
        </Button>

        <h1 className="text-2xl font-semibold">Edit Lead</h1>
      </div>

      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 flex items-center justify-center rounded-xl">
        <LeadWizard
          initialData={lead}
          leadId={id as string}
          mode="edit"
          onComplete={() => {
            router.push('/leads');
            showSnackbar('Lead updated successfully ✅', 'success');
          }}
        />
      </div>
    </div>
  );
}