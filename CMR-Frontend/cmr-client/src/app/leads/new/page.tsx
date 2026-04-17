'use client';

import { useRouter } from 'next/navigation';
import LeadWizard from '../../../components/core/LeadWizard/LeadWizard';
import { useSnackbar } from '@/components/core/Snackbar';
import { Button } from '@/components/share/Button';

export default function NewLeadPage() {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

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

        <h1 className="text-2xl font-semibold">Add New Lead</h1>
      </div>

      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 flex items-center justify-center rounded-xl">
        <LeadWizard
          onComplete={() => {
            router.push('/leads');
            showSnackbar('Lead created successfully ✅', 'success');
          }}
        />
      </div>
    </div>
  );
}
