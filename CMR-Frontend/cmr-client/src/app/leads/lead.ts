export interface Lead {
  companyName: string;
  website?: string;
  city?: string;
  country?: string;
  industry?: string;
  employeeCount?: string;

  firstName?: string;
  lastName?: string;
  email: string;
  jobTitle?: string;
  phone?: string;

  leadSource?: string;
  notes?: string;
}