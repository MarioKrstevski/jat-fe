//how to handle multiple stages of interviewing?
//how to handle multiple applications to the same company?
//how to handle multiple offers?
export type JobApplicationStatus =
  | "Bookmarked"
  | "Applied"
  | "NoResponse"
  | "Ghosted"
  | "PhoneScreen"
  | "CodingChallenge"
  | "TakeHomeAssignment"
  | "Onsite"
  | "Behavioral"
  | "Interview"
  | "Offer"
  | "Rejected"
  | "Accepted"
  | "Archived";

export interface JobApplication {
  id: string;
  isArchived: boolean;
  isRemote: boolean;
  userId: string;
  companyName: string;
  jobPosition: string;
  adLink: string;
  status: JobApplicationStatus;
  cvUsed: string;
  motivationalLetter: string;
  notes: string;
  createdAt: string;
  applicationTime: string;
  responseDateTime: string;
  applicationLocation: string;
  referralSource: string;
  wishlist: string;
  companyInfo: string;
  mapLocation: string;
  nextInterviewDate: string;
}
