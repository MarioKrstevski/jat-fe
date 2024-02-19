import { MyResource } from "@/types";
import MyResourceActionsDropdown from "./MyResourceActionsDropdown";

interface MyResourcesListProps {
  myResources: MyResource[];
}
export default function MyResourcesList({
  myResources,
}: MyResourcesListProps) {
  if (myResources.length === 0) return <div>No myResources</div>;
  return (
    <div>
      {myResources.map((myResource) => {
        return (
          <div key={myResource.id}>
            {myResource.name}

            <MyResourceActionsDropdown myResource={myResource} />
          </div>
        );
      })}
    </div>
  );
}
