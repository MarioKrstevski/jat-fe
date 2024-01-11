import { faker } from "@faker-js/faker";
import { JobApplication, JobApplicationStatus } from "../types";
const jobApplicationStatuses: JobApplicationStatus[] = [
  "Bookmarked",
  "Applied",
  "NoResponse",
  "Ghosted",
  "PhoneScreen",
  "CodingChallenge",
  "TakeHomeAssignment",
  "Onsite",
  "Behavioral",
  "Interview",
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
    const jobApplication = {
      id: faker.string.uuid(),
      isArchived: faker.datatype.boolean(),
      isRemote: faker.datatype.boolean(),
      userId: faker.string.uuid(),
      companyName: faker.company.name(),
      jobPosition: faker.person.jobTitle(),
      adLink: faker.internet.url(),
      status: getRandomJobApplicationStatus(),
      cvUsed: faker.system.commonFileName(),
      motivationalLetter: faker.lorem.paragraph(),
      notes: faker.lorem.paragraph(),
      createdAt: faker.date.past().toISOString(),
      applicationTime: faker.date.past().toISOString(),
      responseDateTime: faker.date.past().toISOString(),
      applicationLocation: faker.location.city(),
      referralSource: faker.person.jobArea(),
      wishlist: faker.lorem.paragraph(),
      companyInfo: faker.lorem.paragraph(),
      mapLocation: faker.location.city(),
      nextInterviewDate: faker.date.past().toISOString(),
    };
    jobApplications.push(jobApplication);
  }
  return jobApplications;
}

export function getFakeJobApplications(): JobApplication[] {
  return generateFakeJobApplications(30);
}
