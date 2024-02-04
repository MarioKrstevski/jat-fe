import { Link } from "react-router-dom";

export default function Onboarding() {
  return (
    <div>
      <p>Onboarding content here</p>

      <Link to={"/dashboard"}>Back to Dashboard</Link>
    </div>
  );
}
