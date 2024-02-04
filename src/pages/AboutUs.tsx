import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <div>
      <p>Something about us</p>

      <Link to={"/dashboard"}>Back to Dashboard</Link>
    </div>
  );
}
