import { UserButton } from "@clerk/clerk-react";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="flex border-b shadow-sm justify-start h-16 bg-white items-center gap-3 py-4 px-6">
      <h2 className="text-2xl pl-4">Job Buddy</h2>
      {/* <Navigation /> */}
      <div className="ml-auto">
        <UserButton showName afterSignOutUrl="/signin" />
      </div>
    </header>
  );
}
