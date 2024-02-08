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

export type WorkModeType = "In Office" | "Remote" | "Hybrid";
export type EmploymentType =
  | "Full Time"
  | "Part Time"
  | "Internship"
  | "Contract"
  | "Freelance";

export interface JobApplication {
  userId: string;
  id: string;
  workMode: WorkModeType;
  employmentType: EmploymentType;
  offersVisaSponsorship: boolean;
  offersRelocation: boolean;
  isArchived: boolean;
  wasReferred: boolean;
  isFavorite: boolean;
  perks: string; // comma separated values
  tags: string; // comma separated values
  referredBy: string;
  companyId: string | null;
  company?: Company;
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  jobLocation: string;
  link: string;
  applylink: string;
  status: string;
  nextStep: string;
  timeline: string;
  statusOptions: string;
  resumeUsed: string;
  motivationalLetter: string;
  note: Note;
  interestLevel: number;
  createdAt: Date;
  updatedAt: Date;
  nextInterviewDate: Date;
  appliedDate: Date;
  postedDate: Date;
  applicationDeadline: Date;
  salaryDetails: string;
  appliedFrom: string;
  heardAboutFrom: string;
  mapLocation: string;
  todos: string;
}

export interface Interview {
  id: string;
  userId: string;
  date: Date;
  jobApplication?: JobApplication;
  jobApplicationId?: string;
  type: string;
  format: string;
  noteId: string;
  note: Note;
  createdAt: Date;
  updatedAt: Date;
  contacts: Contact[];
}
export interface Contact {
  id: string;
  userId: string;
  name: string;
  companyName?: string;
  positionOrDepartment?: string;
  company?: Company;
  companyId?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  noteId: string;
  note: Note;
  createdAt: Date;
  updatedAt: Date;
}
export interface Note {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  jobApplicationId?: string;
  jobApplication?: JobApplication;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
  companySize: string;
  industry: string;
  linkedin: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobApplicationTodo {
  id: string;
  text: string;
  isCompleted: boolean;
  relatedTo: string;
}
export interface JobApplicationTag {
  id: string;
  name: string;
  userId: string;
  color: string;
}
export interface TimelineEntry {
  status: string;
  date: string; // new Date().getTime().toString()
}
export type EditTypes =
  | "statusChange"
  | "nextInterviewDateChange"
  | "todosChange"
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
