//how to handle multiple stages of interviewing?
//how to handle multiple applications to the same company?
//how to handle multiple offers?

export type JobApplicationStatus =
  | "Wishlist"
  | "OA - Online Assessment"
  | "Applied"
  | "Waiting Referral"
  | "No Response"
  | "Ghosted"
  | "Phone Screen"
  | "Coding Challenge"
  | "Take-Home Assignment"
  | "Onsite"
  | "Behavioral"
  | "Interview"
  | "Offer"
  | "Rejected"
  | "Accepted"
  | "Archived";

export interface JobApplicationGenerated {
  id: string;
  isArchived: boolean;
  isRemote: boolean;
  wasReffered: boolean;
  refferedBy: string;
  companyId: string | null;
  companyName: string;
  companyInfo: string;
  jobPositionTitle: string;
  link: string;
  status: string;
  timeline: string;
  statusOptions: string;
  resumeUsed: string;
  motivationalLetter: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  nextInterviewDate: Date;
  salaryDetails: string;
  appliedFrom: string;
  heardAboutFrom: string;
  mapLocation: string;
  todos: string;
}
export interface JobApplication {
  userId: string;
  id: string;
  isArchived: boolean;
  isRemote: boolean;
  wasReffered: boolean;
  refferedBy: string;
  companyId: string | null;
  companyName: string;
  companyInfo: string;
  jobPositionTitle: string;
  link: string;
  status: string;
  timeline: string;
  statusOptions: string;
  resumeUsed: string;
  motivationalLetter: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  nextInterviewDate: Date;
  salaryDetails: string;
  appliedFrom: string;
  heardAboutFrom: string;
  mapLocation: string;
  todos: string;
}
