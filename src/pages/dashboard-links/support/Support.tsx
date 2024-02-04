import { contactSupportEmail } from "@/global/values";

export default function Support() {
  return (
    <div>
      <p>If you need help witything feel free to send us an email </p>
      <p className="my-4">
        Email:{" "}
        <span className="text-blue-500 italic">
          {" "}
          <a href={"mailto:" + contactSupportEmail}>
            {" "}
            {contactSupportEmail}
          </a>
        </span>
      </p>
    </div>
  );
}
