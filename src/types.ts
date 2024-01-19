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
  | "Interview Scheduled"
  | "Interview Done"
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
  jobTitle: string;
  jobDescription: string;
  applylink: string;
  link: string;
  status: string;
  waitingFor: string;
  timeline: string;
  statusOptions: string;
  resumeUsed: string;
  motivationalLetter: string;
  notes: string;
  interestLevel: number;
  createdAt: Date;
  updatedAt: Date;
  nextInterviewDate: Date;
  postedDate: Date;
  applicationDeadline: Date;
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
  jobTitle: string;
  jobDescription: string;
  link: string;
  applylink: string;
  status: string;
  waitingFor: string;
  timeline: string;
  statusOptions: string;
  resumeUsed: string;
  motivationalLetter: string;
  notes: string;
  interestLevel: number;
  createdAt: Date;
  updatedAt: Date;
  nextInterviewDate: Date;
  postedDate: Date;
  applicationDeadline: Date;
  salaryDetails: string;
  appliedFrom: string;
  heardAboutFrom: string;
  mapLocation: string;
  todos: string;
}
