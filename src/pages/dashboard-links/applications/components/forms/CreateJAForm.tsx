import { api } from "@/api/backend";
import CheckboxField from "@/components/form-fields/CheckboxField";
import DateTimeField from "@/components/form-fields/DateTimeField";
import NumberField from "@/components/form-fields/NumberField";
import SelectField from "@/components/form-fields/SelectField";
import TextField from "@/components/form-fields/TextField";
import TextareaField from "@/components/form-fields/TextareaField";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import {
  defaultEmploymentType,
  defaultStatusOptions,
  defaultWorkModeOptions,
} from "@/global/values";
import { useDialogControl } from "@/hooks/useDialogControl";
import { useJobApplicationsStore } from "@/hooks/useJobApplicationsStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsUpDownIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ExistingTagsControl from "./ExistingTagsControl";
import ReactQuill from "react-quill";

const formSchema = z.object({
  companyName: z.string(),
  jobTitle: z.string(),
  status: z.string(),
  jobLocation: z.string().optional(),
  jobDescription: z.string().optional(),
  applylink: z.string().optional(),
  link: z.string().optional(),
  nextStep: z.string().optional(),
  timeline: z.string().optional(),
  statusOptions: z.string().optional(),
  resumeUsed: z.string().optional(),
  motivationalLetter: z.string().optional(),
  note: z.string().optional(),
  interestLevel: z.number().min(0).max(5).optional(),
  employmentType: z.string().optional(),
  workMode: z.string().optional(),
  wasReferred: z.boolean().optional(),
  offersRelocation: z.boolean().optional(),
  isFavorite: z.boolean().optional(),
  offersVisaSponsorship: z.boolean().optional(),
  referredBy: z.string().optional(),
  postedDate: z.date().optional(),
  applicationDeadline: z.date().optional(),
  perks: z.string().optional(),
  tags: z.string().optional(),
  salaryDetails: z.string().optional(),
  nextInterviewDate: z.date().optional(),
  appliedDate: z.date().optional(),
  appliedFrom: z.string().optional(),
  heardAboutFrom: z.string().optional(),
  mapLocation: z.string().optional(),
  todos: z.string().optional(),
  companyId: z.string().nullable(),
});

export default function CreateJAForm({}) {
  const dialogControl = useDialogControl();
  const jobApplicationStore = useJobApplicationsStore();
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [tagsChanged, setTagsChanged] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      jobTitle: "",
      jobLocation: "",
      status: "Wishlist",
      jobDescription: "",
      applylink: "",
      link: "",
      nextStep: "Applying",
      timeline: "",
      statusOptions: defaultStatusOptions.join(","),
      resumeUsed: "",
      motivationalLetter: "",
      workMode: "In-Office",
      employmentType: "Full-time",
      note: "",
      perks: "",
      tags: "",
      salaryDetails: "",
      appliedFrom: "",
      heardAboutFrom: "",
      mapLocation: "",
      todos: "",
      companyId: null,
      interestLevel: 0,
      isFavorite: false,
      offersRelocation: false,
      offersVisaSponsorship: false,
      wasReferred: false,
      referredBy: "",
      postedDate: undefined,
      appliedDate: undefined,
      applicationDeadline: undefined,
      nextInterviewDate: undefined,
    },
  });

  const parseCopiedJobDetails = () => {
    // Get the copied string from the clipboard
    const copiedString = navigator.clipboard.readText();

    copiedString.then((text) => {
      try {
        // Parse the string into an object
        const parsedJobDetails = JSON.parse(text);

        // console.log("Parsed job details:", parsedJobDetails);

        const {
          company: companyName,
          jobDescription,
          jobTitle,
          location,
        } = parsedJobDetails;

        console.log("jobdesc", jobDescription);

        form.setValue("companyName", companyName);
        form.setValue("jobDescription", jobDescription);
        form.setValue("jobTitle", jobTitle);
        form.setValue("jobLocation", location);

        toast.success("Fields filled successfully");
        // Update state with the parsed object

        // You can now use the parsedJobDetails object in your app
        // For example, display the information in a component
      } catch (error) {
        console.error("Error parsing job details:", error);
      }
    });
  };

  function handleJatPaste() {
    parseCopiedJobDetails();
  }
  function handleFormReset() {
    form.reset();
  }

  function handleCreateJobApplication(
    jobApplication: z.infer<typeof formSchema>
  ) {
    setIsLoading(true);
    api.applications
      .createJobApplication(jobApplication)
      .then((res) => {
        console.log("res", res);
        toast.success("Job application created successfully");

        const newJobApplicationsArray = [
          ...jobApplicationStore.jobApplications,
          res.data.jobApplication,
        ];
        jobApplicationStore.setJobApplications(
          newJobApplicationsArray
        );

        form.reset();
        dialogControl.closeModal("createJA");
      })
      .catch((err) => {
        toast.error(
          "Job application creation failed, check error in console"
        );

        toast.error(JSON.stringify(err));
        console.log("err", JSON.stringify(err.response.data));
        console.log("err", JSON.stringify(err));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("add new", values);
    const jobApplication = { ...values };
    handleCreateJobApplication(jobApplication);
  }

  return (
    <div className="space-y-4 py-2 pb-4" ref={formContainerRef}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Company Name */}
          <div>
            <TextField
              form={form}
              fieldName="companyName"
              label="Company Name *"
              placeholder="Google"
            />
          </div>
          {/* Job Position */}
          <div>
            <TextField
              form={form}
              fieldName="jobTitle"
              label="Job Title *"
              placeholder="Software Engineer"
            />
          </div>
          {/* Status + Waiting For */}
          <div className="flex gap-4 mb-3">
            <SelectField
              fieldName="status"
              label="Status *"
              placeholder="Select columns"
              options={defaultStatusOptions}
              form={form}
            />
            <SelectField
              fieldName="nextStep"
              label="Next Step"
              placeholder="Select columns"
              options={defaultStatusOptions}
              form={form}
            />
          </div>
          <Separator />
          <div className="my-2 p-3 rounded border border-blue-300 bg-blue-50 text-center py-4  font-extralight">
            Everything below is optional and you can add it later
          </div>
          <Separator />

          <Collapsible
            open={isOpen}
            onOpenChange={(open) => {
              const parentElement = formContainerRef.current
                ?.parentNode as HTMLElement;
              parentElement?.scrollBy(0, 100);
              setIsOpen(open);
            }}
            className="w-full space-y-2"
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="w-full my-2 p-0"
              >
                More information about the job
                <ChevronsUpDownIcon className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>

            <CollapsibleContent className="space-y-2">
              {/* Link */}
              <div>
                <TextField
                  form={form}
                  fieldName="link"
                  label="Job Posting Link"
                  placeholder="www.linkedin.com/jobs/..."
                />
              </div>
              {/* Job Location */}
              <div>
                <TextField
                  form={form}
                  fieldName="jobLocation"
                  label="Job Location"
                  placeholder="City, Country, Address"
                />
              </div>
              <div>
                {/* Work Mode */}
                <SelectField
                  form={form}
                  fieldName="workMode"
                  label="Work Mode"
                  placeholder="Select value"
                  options={defaultWorkModeOptions}
                />
              </div>
              <div>
                {/* Employment Type */}
                <SelectField
                  form={form}
                  fieldName="employmentType"
                  label="Employment Type"
                  placeholder="Select value"
                  options={defaultEmploymentType}
                />
              </div>
              {/* Job Description */}
              <div>
                <TextareaField
                  form={form}
                  fieldName="jobDescription"
                  label="Job Description (copy paste it)"
                />
              </div>
              {/* Is Favorite */}
              <div>
                <CheckboxField
                  form={form}
                  fieldName="isFavorite"
                  label="Is Favorite (will shop up first in table)"
                />
              </div>
              {/* Salary Details */}
              <div className="flex gap-1 mb-3 ">
                <TextField
                  form={form}
                  fieldName="salaryDetails"
                  placeholder="ex: $400,000/year; $200/hour; 30K-60K"
                  label="Salary details"
                />
              </div>
              {/* Applicatoin Deadline */}
              <div className="flex gap-4 mb-3">
                <DateTimeField
                  form={form}
                  fieldName="applicationDeadline"
                  label="Application Deadline"
                />
              </div>
              {/* Posted At */}
              <div className="flex gap-4 mb-3">
                <DateTimeField
                  form={form}
                  fieldName="postedDate"
                  label="Posted At Date"
                />
              </div>

              {/* Next Interview Date */}
              <div className="flex gap-4 mb-3 ">
                <DateTimeField
                  form={form}
                  fieldName="nextInterviewDate"
                  label="Next Interview Date"
                />
              </div>

              {/* Applied Date */}
              <div className="flex gap-4 mb-3 ">
                <DateTimeField
                  form={form}
                  fieldName="appliedDate"
                  label="Applied Date"
                />
              </div>
              {/* Was Referred and Referred by */}
              <div className="flex gap-1 mb-3 items-end">
                <CheckboxField
                  form={form}
                  fieldName="wasReferred"
                  label="Was Referred"
                />
                <TextField
                  form={form}
                  fieldName="referredBy"
                  label="Referrered by"
                  placeholder="Referrered by"
                />
              </div>

              {/* Interest Level */}
              <div className="flex gap-1 mb-3 ">
                <NumberField
                  form={form}
                  fieldName="interestLevel"
                  label="Interest Level"
                  min={0}
                  max={5}
                />
              </div>
              {/* Tags */}
              <div>
                {/* // inside it expects for the field to be called tags */}
                <ExistingTagsControl form={form} tags={tagsChanged} />
                <TextField
                  form={form}
                  fieldName="tags"
                  label="Tags (comma separated)"
                  placeholder="tech,fe,be,remote"
                  sanitize={(value: string) => {
                    // dont allow two commas in a row
                    if (
                      value.at(-1) === "," &&
                      value.at(-2) === ","
                    ) {
                      const newValue = value.slice(0, -1);
                      setTagsChanged(newValue);
                      return newValue;
                    }
                    const newValue = value
                      .split(",")
                      .map((tag) => tag.trim())
                      .join(",");
                    setTagsChanged(newValue);
                    return newValue;
                  }}
                />
              </div>
              {/* Resume Used + Motivational Used */}
              <div className="flex gap-1 mb-3 ">
                <TextField
                  form={form}
                  fieldName="resumeUsed"
                  label="Used Resume"
                  placeholder="Resume Link"
                />
                <TextField
                  form={form}
                  fieldName="motivationalLetter"
                  label="motivational Letter"
                  placeholder="ML Link"
                />
              </div>
              {/* Note */}
              <div className="flex gap-1 mb-3 ">
                {/* <TextareaField
                  form={form}
                  fieldName="note"
                  label="Add note"
                /> */}
                <div className="w-full h-60">
                  <p>Add note</p>
                  <ReactQuill
                    theme="snow"
                    className="h-44"
                    value={form.getValues("note")}
                    onChange={(stringifiedHTML) => {
                      form.setValue("note", stringifiedHTML);
                    }}
                  />
                </div>
              </div>
              {/* Applied Link + Applied from*/}
              <div className="flex gap-1 mb-3 ">
                <TextField
                  form={form}
                  fieldName="applylink"
                  label="Apply Link"
                  placeholder="www.linkedin.com/jobs/..."
                />
                <TextField
                  form={form}
                  fieldName="appliedFrom"
                  label="Applied From"
                  placeholder="ex: With link, email, in person"
                />
              </div>
              {/* Todos */}
              <div className="flex gap-1 mb-3 ">
                <TextareaField
                  form={form}
                  fieldName="todos"
                  label="Add todos (enter separated)"
                />
              </div>
              <div className="my-2 text-sm">
                <p>Created Todos:</p>
              </div>
              {/* Perks*/}
              <div>
                <TextField
                  form={form}
                  fieldName="perks"
                  label="Perks"
                  placeholder="ex: Lunch,Gym,Courses"
                />
              </div>
              <div className="flex gap-1 my-3">
                <CheckboxField
                  form={form}
                  fieldName="offersRelocation"
                  label="Offers Relocation"
                />
                <CheckboxField
                  form={form}
                  fieldName="offersVisaSponsorship"
                  label="Offers Visa Sponsorship"
                />
              </div>

              {/* Heard about from + Map location*/}
              <div className="flex gap-1 mb-3 ">
                <TextField
                  form={form}
                  fieldName="heardAboutFrom"
                  label="Job Source"
                  placeholder="ex: Friend, LinkedIn, Indeed"
                />

                <TextField
                  form={form}
                  fieldName="mapLocation"
                  label="Map Location"
                  placeholder="ex: 40.7128,74.0060"
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          <div className="pt-6 space-x-2 flex items-center justify-end">
            <Button
              disabled={isLoading}
              variant={"outline"}
              className="mr-auto"
              type="button"
              onClick={handleJatPaste}
            >
              JAT Paste
            </Button>
            <Button
              disabled={isLoading}
              variant={"ghost"}
              className="mr-auto"
              type="reset"
              onClick={handleFormReset}
            >
              Reset
            </Button>
            <Button
              disabled={isLoading}
              variant={"ghost"}
              type="button"
              onClick={() => dialogControl.closeModal("createJA")}
            >
              Cancel
            </Button>
            <Button disabled={isLoading} type="submit">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
