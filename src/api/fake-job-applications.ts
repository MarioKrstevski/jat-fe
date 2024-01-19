import { faker } from "@faker-js/faker";
import {
  JobApplicationGenerated,
  JobApplicationStatus,
} from "../types";
const jobApplicationStatuses: JobApplicationStatus[] = [
  "Wishlist",
  "Applied",
  "OA - Online Assessment",
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
function getRandomJobApplicationStatus(): JobApplicationStatus {
  const randomIndex = faker.number.int({
    min: 0,
    max: jobApplicationStatuses.length - 1,
  });
  return jobApplicationStatuses[randomIndex];
}
export function generateFakeJobApplications(size: number) {
  const jobApplications = [];
  for (let i = 0; i < size; i++) {
    const jobApplication: JobApplicationGenerated = {
      // userId: faker.string.uuid(),
      id: faker.string.uuid(),
      isArchived: false,
      isRemote: faker.datatype.boolean(),
      wasReffered: faker.datatype.boolean(),
      refferedBy: faker.person.fullName(),
      companyId: faker.string.uuid(),
      companyName: faker.company.name(),
      companyInfo: faker.lorem.paragraph(1),
      interestLevel: faker.number.int({ min: 1, max: 5 }),
      jobTitle: faker.person.jobTitle(),
      link: faker.internet.url(),
      applylink: faker.internet.url(),
      postedDate: faker.date.past(),
      applicationDeadline: faker.date.future(),
      jobDescription: faker.lorem.paragraph(1),
      status: getRandomJobApplicationStatus(),
      waitingFor: getRandomJobApplicationStatus(),
      statusOptions: jobApplicationStatuses.join(","),
      timeline: faker.lorem.paragraph(1),
      resumeUsed: faker.lorem.paragraph(1),
      motivationalLetter: faker.lorem.paragraph(1),
      notes: faker.lorem.paragraph(1),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
      nextInterviewDate: faker.date.future(),
      salaryDetails: faker.lorem.paragraph(1),
      appliedFrom: faker.lorem.paragraph(1),
      heardAboutFrom: faker.lorem.paragraph(1),
      mapLocation:
        faker.location.latitude().toString() +
        "," +
        faker.location.longitude().toString(),
      todos: "",
    };
    jobApplications.push(jobApplication);
  }
  return jobApplications;
}

export function getFakeJobApplications(): JobApplicationGenerated[] {
  return generateFakeJobApplications(30);
}
