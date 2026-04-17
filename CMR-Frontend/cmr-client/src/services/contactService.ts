import axios from "axios";

// Create axios instance
export const contactApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ----------- API METHODS -----------

// Get all leads
export const getLeads = async () => {
  const res = await contactApi.get("/contacts");
  return res.data;
};

// Create lead
export const createLead = async (payload: any) => {
  const res = await contactApi.post("/contacts", payload);
  return res.data;
};

// Delete lead
export const deleteLead = async (id: string) => {
  await contactApi.delete(`/contacts/${id}`);
};

// Get lead by id
export const getLeadById = async (id: string) => {
  const res = await contactApi.get(`/contacts/${id}`);
  return res.data;
};

// Update lead
export const updateLead = async (id: string, payload: any) => {
  const res = await contactApi.put(`/contacts/${id}`, payload);
  return res.data;
};