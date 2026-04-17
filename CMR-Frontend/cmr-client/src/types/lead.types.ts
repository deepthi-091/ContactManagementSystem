export interface Lead {
  id?: string;   // ✅ make optional

  companyName: string;
  email: string;

  website?: string;
  city?: string;
  country?: string;
  industry?: string;
  employeeCount?: string;

  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  phone?: string;

  leadSource?: string;
  notes?: string;
}
