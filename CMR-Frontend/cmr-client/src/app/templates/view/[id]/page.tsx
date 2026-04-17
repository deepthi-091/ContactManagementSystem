'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { getTemplateById } from '@/services/templateService';
import { Button } from '@/components/share/Button';
import { useSnackbar } from '@/components/core/Snackbar';
import Loader from '@/components/core/Loader';

export default function ViewTemplatePage() {
  const { id } = useParams();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  const [template, setTemplate] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getTemplateById(id as string);
        setTemplate(data);
      } catch {
        showSnackbar('Failed to load template', 'error');
      } finally {
        setLoading(false);
      }
    };

    if (id) load();
  }, [id]);

  if (loading) return <Loader />;

  if (!template) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Template not found
      </div>
    );
  }
 return (
  <div className="min-h-screen bg-gray-50 py-10">
    <div className="max-w-4xl mx-auto px-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            size="sm"
            onClick={() => router.push("/templates")}
            className="bg-orange-100 text-orange-700 hover:bg-orange-200"
          >
            ← Back
          </Button>

          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Template Details
            </h1>
            <p className="text-sm text-gray-500">
              View email template information
            </p>
          </div>
        </div>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden transition hover:shadow-xl">
        {/* CARD HEADER */}
        <div className="px-6 py-4 bg-gradient-to-r from-orange-50 to-white border-b">
          <p className="text-xs uppercase tracking-wide text-orange-600 font-medium">
            Subject
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mt-1">
            {template.subject}
          </h2>
        </div>

        {/* BODY */}
        <div className="p-6">
          <p className="text-xs uppercase tracking-wide text-orange-600 font-medium mb-3">
            Email Body
          </p>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 font-mono text-sm whitespace-pre-wrap leading-relaxed text-gray-800 transition hover:border-orange-300">
            {template.body}
          </div>
        </div>
      </div>

      {/* FOOTER INFO (OPTIONAL) */}
      <div className="mt-6 text-sm text-gray-400 text-center">
        This template can be edited or reused in campaigns
      </div>
    </div>
  </div>
);
}
