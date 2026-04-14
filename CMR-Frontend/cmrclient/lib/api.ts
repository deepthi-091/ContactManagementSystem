import type { ContactFormData, CreateContactResponse } from "@/types/contact";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type ApiError = { message: string; status?: number; details?: unknown };

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  if (!baseUrl) {
    throw { message: "Missing NEXT_PUBLIC_API_BASE_URL in .env.local" } as ApiError;
  }

  const res = await fetch(`${baseUrl}${path}`, {
    headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
    ...options,
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw {
      message: data?.message || `Request failed: ${res.status}`,
      status: res.status,
      details: data,
    } as ApiError;
  }

  return data as T;
}

/**
 * Step 1: create a contact row with company info.
 * Backend endpoint expected: POST /contacts
 * Should return: { id: "uuid" } OR { contactId: "uuid" }
 */
export async function createContact(payload: Partial<ContactFormData>) {
  return request<CreateContactResponse>("/contacts", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Step 2/3: update existing contact row with contact + source info.
 * Backend endpoint expected: PUT /contacts/:id
 */
export async function updateContact(contactId: string, payload: Partial<ContactFormData>) {
  return request(`/contacts/${contactId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

/**
 * Final helper: convenience wrapper.
 * You can choose to use this later; wizard already uses create + update.
 */
export async function saveLead(allData: ContactFormData) {
  const created = await createContact(allData);
  const id = created.id || created.contactId;
  if (!id) throw new Error("Backend did not return contact id");
  await updateContact(id, allData);
  return { id };
}
