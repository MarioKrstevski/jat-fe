import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./ui/button";

export default function Upcomming({ imgSrc }: { imgSrc: string }) {
  const [shown, setShown] = useState(false);
  return (
    <div className="my-4">
      <h3 className="mb-2 text-lg">Future Developemnt Example</h3>
      <div className={cn("border-2 shadow-lg rounded-md relative ")}>
        {!shown && (
          <Button
            variant={"outline"}
            onClick={() => setShown(true)}
            className="blur-none absolute top-[50%] left-[50%] z-20 -translate-x-1/2 -translate-y-1/2"
          >
            {" "}
            Reveal{" "}
          </Button>
        )}
        <div
          className={cn(
            "absolute inset-0 w-full h-full z-10 ",
            !shown && "bg-black bg-opacity-90"
          )}
        ></div>
        <img
          className="max-w-full rounded-md z-0"
          src={imgSrc}
          alt=""
        />
      </div>
    </div>
  );
}
