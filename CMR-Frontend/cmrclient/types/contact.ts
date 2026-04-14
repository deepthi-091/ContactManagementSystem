export type EmployeeCount = "10-50" | "51-100" | "101-250" | "250+";
export type Industry = "SaaS" | "Fintech" | "Healthcare" | "E-commerce" | "Other";
export type LeadSource =
  | "Inbound form"
  | "Outbound reach"
  | "Referral"
  | "Event/Webinar"
  | "Content/Blog"
  | "Paid ad"
  | "LinkedIn"
  | "Other";

export type ContactFormData = {
  // Step 1
  companyName: string;
  website?: string;
  city?: string;
  country?: string;
  industry?: Industry | "";
  employeeCount?: EmployeeCount | "";

  // Step 2
  firstName?: string;
  lastName?: string;
  email: string;
  jobTitle?: string;
  phone?: string;

  // Step 3
  leadSource?: LeadSource | "";
  notes?: string;
};

export type CreateContactResponse = {
  id?: string;
  contactId?: string;
};