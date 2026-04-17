import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

/* =========================
   CREATE TEMPLATE
   POST /api/templates
========================= */
export const createTemplate = (data: any) => {
  return api.post('/templates', data);
};

/* =========================
   GET ALL TEMPLATES
   GET /api/templates
========================= */
export const getTemplates = async () => {
  const response = await api.get('/templates');
  return response.data;
};

/* =========================
   GET TEMPLATE BY ID (VIEW)
   GET /api/templates/:id
========================= */
export const getTemplateById = async (id: string) => {
  const response = await api.get(`/templates/${id}`);
  return response.data;
};

/* =========================
   UPDATE TEMPLATE (EDIT)
   PUT /api/templates/:id
========================= */
export const updateTemplate = async (id: string, data: any) => {
  const response = await api.put(`/templates/${id}`, data);
  return response.data;
};

/* =========================
   DELETE TEMPLATE
   DELETE /api/templates/:id
========================= */
export const deleteTemplate = async (id: string) => {
  const response = await api.delete(`/templates/${id}`);
  return response.data;
};