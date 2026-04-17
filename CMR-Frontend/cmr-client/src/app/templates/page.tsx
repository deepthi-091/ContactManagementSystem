'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { getTemplates, deleteTemplate } from '@/services/templateService';
import { Button } from '@/components/share/Button';
import InputField from '@/components/share/InputField';
import { useSnackbar } from '@/components/core/Snackbar';
import Loader from '@/components/core/Loader';

export default function TemplatesPage() {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  const [templates, setTemplates] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const data = await getTemplates();
      setTemplates(data);
    } catch {
      showSnackbar('Failed to load templates', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteTemplate(id);
      showSnackbar('Template deleted successfully ✅', 'success');
      loadTemplates();
    } catch {
      showSnackbar('Failed to delete template ❌', 'error');
    }
  };

  const filtered = templates.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loader />;

return (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Email Templates
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create, manage, and reuse email templates for campaigns
          </p>
        </div>

        <Button
          onClick={() => router.push('/templates/new')}
          className="mt-4 md:mt-0 px-6 py-3"
        >
          + New Template
        </Button>
      </div>

      {/* TOOLBAR */}
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* ✅ InputField used here */}
          <div className="w-full md:w-80">
            <InputField
              placeholder="Search templates"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div className="text-sm text-gray-500">
            Total Templates:{' '}
            <span className="font-medium text-gray-800">
              {filtered.length}
            </span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No templates found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((template) => (
              <div
                key={template.id}
                className="border rounded-xl p-5 hover:shadow-md transition"
              >
                <h2 className="font-semibold text-gray-900 mb-1">
                  {template.name}
                </h2>

                <p className="text-sm text-gray-600">
                  {template.subject}
                </p>

                <p className="text-sm text-gray-500 mt-3 line-clamp-3">
                  {template.body}
                </p>

                <div className="flex gap-2 mt-5">
                  <Button
                    size="sm"
                    onClick={() =>
                      router.push(`/templates/view/${template.id}`)
                    }
                  >
                    View
                  </Button>

                  <Button
                    size="sm"
                    variant="success"
                    onClick={() =>
                      router.push(`/templates/edit/${template.id}`)
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(template.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);
}
