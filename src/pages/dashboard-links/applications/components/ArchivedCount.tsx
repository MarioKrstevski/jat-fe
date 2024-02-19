import { api } from "@/api/backend";
import { useQuery } from "@tanstack/react-query";

interface ArchivedCountProps {}
export default function ArchivedCount({}: ArchivedCountProps) {
  const { data: applications } = useQuery({
    initialData: [],
    queryKey: ["jobApplications"],
    queryFn: api.applications.getJobApplications,
  });

  if (!applications) return null;

  const apllicationsCount = applications.filter((a) => {
    return a.isArchived;
  }).length;

  return <div className="pr-2">{apllicationsCount}</div>;
}
