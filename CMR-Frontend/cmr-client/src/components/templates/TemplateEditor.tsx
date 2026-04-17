'use client';

import { useEffect, useState } from 'react';
import {
  createTemplate,
  getTemplateById,
  updateTemplate,
} from '@/services/templateService';
import type { ChangeEvent } from 'react';
import { Button } from '@/components/share/Button';
import InputField from '@/components/share/InputField';
import TextAreaField from '@/components/share/TextAreaField';
import { useSnackbar } from '@/components/core/Snackbar';
import Loader from '@/components/core/Loader';

interface TemplateEditorProps {
  mode: 'create' | 'edit';
  templateId?: string;
  onSuccess: () => void;
}

type SequencePosition = 'first' | 'second';

export default function TemplateEditor({
  mode,
  templateId,
  onSuccess,
}: TemplateEditorProps) {
  const { showSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(mode === 'edit');
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: '',
    subject: '',
    body: '',
    sequencePosition: 'first' as SequencePosition,
    industries: [] as string[],
    regions: [] as string[],
  });

  /* ✅ FIX #1: Restore ALL required fields on edit */
  useEffect(() => {
    if (mode !== 'edit' || !templateId) return;

    const loadTemplate = async () => {
      try {
        const data = await getTemplateById(templateId);
        setForm({
          name: data.name ?? '',
          subject: data.subjectLine ?? '',
          body: data.body ?? '',
          sequencePosition: data.sequencePosition as SequencePosition,
          industries: data.industries ?? [],
          regions: data.regions ?? [],
        });
      } catch {
        showSnackbar('Failed to load template ❌', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadTemplate();
  }, [mode, templateId]);

  const handleSubmit = async () => {
    if (!form.name || !form.subject || !form.body) {
      showSnackbar('Please fill all required fields', 'error');
      return;
    }

    if (!form.body.includes('{{unsubscribe_link}}')) {
      showSnackbar('Email must include {{unsubscribe_link}}', 'error');
      return;
    }

    try {
      setSaving(true);

      /* ✅ FIX #2 + #3: Backend‑safe payload */
      const payload = {
        name: form.name,
        subjectLine: form.subject,
        body: form.body,
        sequencePosition: form.sequencePosition, // ✅ first | second
        industries: form.industries, // ✅ string[]
        regions: form.regions, // ✅ string[]
        status: 'draft', // ✅ NOT "active"
      };

      if (mode === 'create') {
        await createTemplate(payload);
        showSnackbar('Template created successfully ✅', 'success');
      } else {
        await updateTemplate(templateId as string, payload);
        showSnackbar('Template updated successfully ✅', 'success');
      }

      onSuccess();
    } catch (error) {
      console.error(error);
      showSnackbar('Failed to save template ❌', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

const insertPlaceholder = (placeholder: string) => {
  setForm((prev) => ({
    ...prev,
    body: prev.body
      ? prev.body + `\n{{${placeholder}}}`
      : `{{${placeholder}}}`,
  }));
}

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
      <InputField
        placeholder="Template Name"
        value={form.name}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <InputField
        placeholder="Email Subject"
        value={form.subject}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setForm({ ...form, subject: e.target.value })
        }
      />

      {/* ✅ Sequence Position */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Sequence Position
        </label>
        <div className="flex gap-3">
          <Button
            size="sm"
            variant={form.sequencePosition === 'first' ? 'primary' : 'secondary'}
            onClick={() =>
              setForm({ ...form, sequencePosition: 'first' })
            }
          >
            1st Email (Welcome)
          </Button>

          <Button
            size="sm"
            variant={form.sequencePosition === 'second' ? 'primary' : 'secondary'}
            onClick={() =>
              setForm({ ...form, sequencePosition: 'second' })
            }
          >
            2nd Email (Follow‑up)
          </Button>
        </div>
      </div>

   {/* ✅ Email Body */}
<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">
    Email Body
  </label>

  {/* ✅ Placeholder toolbar */}
  <div className="flex flex-wrap gap-2 mb-2">
    <Button size="sm" variant="secondary" onClick={() => insertPlaceholder('firstName')}>
      First Name
    </Button>
    <Button size="sm" variant="secondary" onClick={() => insertPlaceholder('lastName')}>
      Last Name
    </Button>
    <Button size="sm" variant="secondary" onClick={() => insertPlaceholder('company')}>
      Company
    </Button>
    <Button size="sm" variant="secondary" onClick={() => insertPlaceholder('jobTitle')}>
      Job Title
    </Button>
    <Button
      size="sm"
      variant="secondary"
      onClick={() => insertPlaceholder('unsubscribe_link')}
    >
      Unsubscribe Link
    </Button>
  </div>

  <TextAreaField
    rows={10}
    placeholder="Write your email content here..."
    value={form.body}
    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
      setForm({ ...form, body: e.target.value })
    }
  />

  
<p className="text-xs text-gray-500">
  Plain‑text emails only. <strong>{"{{unsubscribe_link}}"}</strong> is required.
</p>

</div>
{/* ✅ Footer Actions */}
<div className="flex justify-end gap-3 pt-4 border-t">
  <Button
    variant="secondary"
    onClick={onSuccess}
    disabled={saving}
  >
    Cancel
  </Button>

  <Button
    variant="primary"
    onClick={handleSubmit}
    disabled={saving}
  >
    {mode === 'create' ? 'Add Template' : 'Update Template'}
  </Button>
</div>
    </div>
  );
}