export const contactSupportEmail = "mariokrstevski@hotmail.com";
export const defaultContactRelationshipOptions = [
  "Recruiter",
  "Referral",
  "Friend",
  "Hiring Manager",
  "Co-worker",
  "Mentor",
  "Alumni",
  "Other",
];

export const tagColorsOptions = [
  "#CDFADB",
  "#F6FDC3",
  "#FFCF96",
  "#FF8080",
  "#FFFFFF",
  "#000000",
];

export const defaultStatusOptions = [
  "Wishlist",
  "OA - Online Assessment",
  "Applying",
  "Applied",
  "Waiting Referral",
  "No Response",
  "Ghosted",
  "Phone Screen",
  "Coding Challenge",
  "Take-Home Assignment",
  "Onsite",
  "Behavioral",
  "Interview Scheduled",
  "Interview Done",
  "Offer",
  "Rejected",
  "Accepted",
  "Archived",
];

export const defaultInterviewTypesOptions = [
  "Technical",
  "HR",
  "Initial Screen",
  "Work Culture",
  "Other",
];

export const defaultInterviewFormatOptions = [
  "Video",
  "Phone",
  "Onsite",
  "Other",
];

export const defaultWorkModeOptions = [
  "In-Office",
  "Remote",
  "Hybrid",
];
export const defaultEmploymentType = [
  "Full-time",
  "Part-time",
  "Internship",
  "Contract",
];
//{ key: which of these should they able to select
export const selectableColumns = [
  // never selectable
  // { key: "userId", label: "" },
  // { key: "id", label: "" },
  // { key: "companyId", label: "" },
  // { key: "companyInfo", label: "" },

  // must visible
  // { key: "companyName", label: "Company" },
  // { key: "jobTitle", label: "Position" },
  { key: "status", label: "Status" },
  { key: "nextStep", label: "Next Step" },
  { key: "nextInterviewDate", label: "Next Interview" },

  // selectable in this order shown
  // { key: "statusOptions", label: "Statuses" },

  { key: "createdAt", label: "Created" },
  { key: "updatedAt", label: "Last Updated" },

  { key: "applicationDeadline", label: "Application Deadline" },
  { key: "postedDate", label: "Job Posted At" },
  { key: "appliedDate", label: "Applied At" },

  { key: "interestLevel", label: "Interest Level" },
  { key: "salaryDetails", label: "Salary" },
  { key: "isRemote", label: "Remote" },
  { key: "jobDescription", label: "Description" },

  { key: "wasReferred", label: "Referred" },
  { key: "referredBy", label: "Referred By" },

  { key: "link", label: "Job Link" },
  { key: "applylink", label: "Apply Link" },

  { key: "jobLocation", label: "Location" },
  { key: "mapLocation", label: "Map Coords" },

  { key: "timeline", label: "Timeline" },

  // { key: "isArchived", label: "Archived" },
  { key: "resumeUsed", label: "Resume" },
  { key: "motivationalLetter", label: "Motivational Letter" },
  { key: "notes", label: "Notes" },

  { key: "appliedFrom", label: "Applied From" },
  { key: "heardAboutFrom", label: "Heard From" },
  { key: "todos", label: "Todos" },
];
