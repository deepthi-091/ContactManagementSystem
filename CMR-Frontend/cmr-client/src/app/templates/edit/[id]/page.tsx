'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/share/Button';
import TemplateEditor from '@/components/templates/TemplateEditor';

export default function EditTemplatePage() {
  const { id } = useParams();
  const router = useRouter();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button size="sm" onClick={() => router.push('/templates')}>
          ← Back
        </Button>
        <h1 className="text-2xl font-semibold">Edit Template</h1>
      </div>

      <TemplateEditor
        mode="edit"
        templateId={id as string}
        onSuccess={() => router.push('/templates')}
      />
    </div>
  );
}