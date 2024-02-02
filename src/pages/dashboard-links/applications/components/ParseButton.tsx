import React, { useState } from "react";

const ParseButton = () => {
  const [parsedData, setParsedData] = useState<any>(null);
  const [jd, setJd] = useState<any>("");

  const parseCopiedJobDetails = () => {
    // Get the copied string from the clipboard
    const copiedString = navigator.clipboard.readText();

    copiedString.then((text) => {
      try {
        // Parse the string into an object
        const parsedJobDetails = JSON.parse(text);
        console.log("Parsed job details:", parsedJobDetails);

        // Update state with the parsed object
        setParsedData(parsedJobDetails);
        setJd(parsedJobDetails.jobDescriptionHTML);

        // You can now use the parsedJobDetails object in your app
        // For example, display the information in a component
      } catch (error) {
        console.error("Error parsing job details:", error);
      }
    });
  };

  return (
    <div>
      <button onClick={parseCopiedJobDetails}>Create</button>
      {parsedData && (
        <div>
          <h2>Parsed Data:</h2>
          <pre>{JSON.stringify(parsedData, null, 2)}</pre>
        </div>
      )}
      {jd && (
        <pre>
          dangerous
          <div dangerouslySetInnerHTML={{ __html: jd }}></div>
        </pre>
      )}
    </div>
  );
};

export default ParseButton;
