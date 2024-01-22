function extractLinkedInJobData() {
  function parseJobDetails(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const companyElement = doc.querySelector(
      ".job-details-jobs-unified-top-card__company-name"
    );
    const company = companyElement
      ? companyElement.textContent.trim()
      : "Company Not Found";

    const jobTitleElement = doc.querySelector(
      ".job-details-jobs-unified-top-card__job-title"
    );
    const jobTitle = jobTitleElement
      ? jobTitleElement.textContent.trim()
      : "Job Title Not Found";

    const locationElement = doc.querySelector(
      ".job-details-jobs-unified-top-card__bullet"
    );
    const locationText = locationElement
      ? locationElement.textContent.trim()
      : "Location Not Found";

    // Split location into city, region, and country
    const [city = "", region = "", country = ""] = locationText
      .split(",")
      .map((part) => part.trim());

    const jobDescriptionElement = doc.querySelector(
      ".jobs-description-content__text"
    );
    const jobDescriptionHTML = jobDescriptionElement
      ? jobDescriptionElement.innerHTML.trim()
      : "Job Description Not Found";

    return {
      company,
      jobTitle,
      location: {
        city,
        region,
        country,
      },
      jobDescriptionHTML,
    };
  }

  function copyToClipboard(text) {
    const dummyTextArea = document.createElement("textarea");
    dummyTextArea.value = text;
    document.body.appendChild(dummyTextArea);
    dummyTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(dummyTextArea);
  }

  const jobDetailsWrapper = document.querySelector(
    ".jobs-search__job-details--wrapper"
  );

  if (!jobDetailsWrapper) {
    console.error("Job details wrapper not found.");
    return;
  }

  const jobDetails = parseJobDetails(jobDetailsWrapper.innerHTML);

  // Convert the job details object to a string
  const jobDetailsString = JSON.stringify(jobDetails);

  // Copy the string to the clipboard
  copyToClipboard(jobDetailsString);

  console.log("Job details copied to clipboard:", jobDetailsString);
}

// Execute the extraction function
extractLinkedInJobData();
