//how to handle multiple stages of interviewing?
//how to handle multiple applications to the same company?
//how to handle multiple offers?

export type JobApplicationStatus =
  | "Wishlist"
  | "OA - Online Assessment"
  | "Applied"
  | "Applying"
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
  wasReferred?: boolean;
  referredBy?: string;
  companyId?: string;
  companyName?: string;
  companyInfo?: string;
  jobTitle?: string;
  jobLocation?: string;
  jobDescription?: string;
  applylink?: string;
  link?: string;
  status?: string;
  waitingFor?: string;
  timeline?: string;
  statusOptions?: string;
  resumeUsed?: string;
  motivationalLetter?: string;
  notes?: string;
  interestLevel?: number;
  createdAt?: Date;
  updatedAt?: Date;
  nextInterviewDate?: Date;
  postedDate?: Date;
  applicationDeadline?: Date;
  salaryDetails?: string;
  appliedFrom?: string;
  heardAboutFrom?: string;
  mapLocation?: string;
  todos?: string;
}
export interface JobApplication {
  userId: string;
  id: string;
  isArchived: boolean;
  isRemote: boolean;
  wasReferred: boolean;
  referredBy: string;
  companyId: string | null;
  companyName: string;
  companyInfo: string;
  jobTitle: string;
  jobDescription: string;
  jobLocation: string;
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
export interface TimelineEntry {
  status: string;
  date: string; // new Date().getTime().toString()
}
export type EditTypes =
  | "statusChange"
  | "nextInterviewDateChange"
  | "allChange";

export interface Column {
  isVisible: boolean;
  label: string;
  key: keyof JobApplication;
  headerCustomCss: string;
  cell: {
    customCss: string;
    events: {
      onClick?: (ja: JobApplication) => void;
    };
    row?: (ja: JobApplication) => JSX.Element;
  };
}
