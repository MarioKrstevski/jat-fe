import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "@/api/backend";
import { Button } from "@/components/ui/button";
import {
  defaultEmploymentType,
  defaultStatusOptions,
  defaultWorkModeOptions,
} from "@/global/values";
import { useDialogControl } from "@/hooks/useDialogControl";
import { useJobApplicationsStore } from "@/hooks/useJobApplicationsStore";
import { parseDateOrUndefined } from "@/lib/utils";
import { JobApplication } from "@/types";
import { ChevronsUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import CheckboxField from "@/components/form-fields/CheckboxField";
import DateTimeField from "@/components/form-fields/DateTimeField";
import NumberField from "@/components/form-fields/NumberField";
import SelectField from "@/components/form-fields/SelectField";
import TextField from "@/components/form-fields/TextField";
import TextareaField from "@/components/form-fields/TextareaField";
import ExistingTagsControl from "./ExistingTagsControl";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/global/variables";

const formSchema = z.object({
  companyName: z
    .string()
    .min(1, { message: "Company name is required" }),
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
  // note: z.string().optional(),
  interestLevel: z.number().min(0).max(5).optional(),
  workMode: z.string().optional(),
  employmentType: z.string().optional(),
  referredBy: z.string().optional(),
  wasReferred: z.boolean().optional(),
  isFavorite: z.boolean().optional(),
  offersRelocation: z.boolean().optional(),
  offersVisaSponsorship: z.boolean().optional(),
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

export default function EditJAForm() {
  const dialogControl = useDialogControl();
  const editModal = dialogControl.modals["editJA"]!;

  const jobApplicationEditted = editModal.data
    .value as JobApplication;
  const jae = jobApplicationEditted;
  const [tagsChanged, setTagsChanged] = useState<string>(jae?.tags);

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync: editJobApplication } = useMutation({
    mutationFn: api.applications.editJobApplication,
    onSuccess: (newData: JobApplication) => {
      queryClient.invalidateQueries({
        queryKey: ["jobApplications"],
      });
      queryClient.setQueryData(
        ["jobApplications"],
        (oldData: JobApplication[]): JobApplication[] => {
          return oldData.map((ja) => {
            if (ja.id === newData.id) {
              console.log(ja, newData);
              return newData;
            }
            return ja;
          });
        }
      );
      form.reset();
      toast.success("Job application updated");
      dialogControl.closeModal("editJA");
    },
    onError: (err: any) => {
      toast.error(
        "Error editing application: ",
        err.response.data.error
      );
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: jae?.companyName,
      jobTitle: jae?.jobTitle,
      jobLocation: jae?.jobLocation,
      status: jae?.status,
      jobDescription: jae?.jobDescription,
      applylink: jae?.applylink,
      link: jae?.link,
      nextStep: jae?.nextStep,
      timeline: jae?.timeline,
      statusOptions: jae?.statusOptions,
      resumeUsed: jae?.resumeUsed,
      motivationalLetter: jae?.motivationalLetter,
      // note: jae?.note,
      salaryDetails: jae?.salaryDetails,
      isFavorite: jae?.isFavorite,
      offersRelocation: jae?.offersRelocation,
      offersVisaSponsorship: jae?.offersVisaSponsorship,
      appliedFrom: jae?.appliedFrom,
      perks: jae?.perks,
      tags: jae?.tags,
      heardAboutFrom: jae?.heardAboutFrom,
      mapLocation: jae?.mapLocation,
      todos: jae?.todos,
      companyId: jae?.companyId,
      interestLevel: jae?.interestLevel,
      workMode: jae?.workMode,
      employmentType: jae?.employmentType,
      wasReferred: jae?.wasReferred,
      referredBy: jae?.referredBy,
      postedDate: parseDateOrUndefined(jae?.postedDate),
      appliedDate: parseDateOrUndefined(jae?.appliedDate),
      applicationDeadline: parseDateOrUndefined(
        jae?.applicationDeadline
      ),
      nextInterviewDate: parseDateOrUndefined(jae?.nextInterviewDate),
    },
  });

  // this reset is important to update the data if we open a job close it and open
  // another one which has a new date, this needs to update it since we are using one
  // modal for all the jobs

  useEffect(() => {
    if (jae) {
      form.reset({
        companyName: jae.companyName,
        jobTitle: jae.jobTitle,
        jobLocation: jae.jobLocation,
        status: jae.status,
        jobDescription: jae.jobDescription,
        applylink: jae.applylink,
        link: jae.link,
        nextStep: jae.nextStep,
        timeline: jae.timeline,
        statusOptions: jae.statusOptions,
        resumeUsed: jae.resumeUsed,
        motivationalLetter: jae.motivationalLetter,
        // note: jae.note,
        salaryDetails: jae.salaryDetails,
        appliedFrom: jae.appliedFrom,
        heardAboutFrom: jae.heardAboutFrom,
        isFavorite: jae.isFavorite,
        offersRelocation: jae.offersRelocation,
        offersVisaSponsorship: jae.offersVisaSponsorship,
        perks: jae.perks,
        tags: jae.tags,
        mapLocation: jae.mapLocation,
        todos: jae.todos,
        companyId: jae.companyId,
        interestLevel: jae.interestLevel,
        workMode: jae.workMode,
        employmentType: jae.employmentType,
        wasReferred: jae.wasReferred,
        referredBy: jae.referredBy,
        postedDate: parseDateOrUndefined(jae.postedDate),
        appliedDate: parseDateOrUndefined(jae.appliedDate),
        applicationDeadline: parseDateOrUndefined(
          jae.applicationDeadline
        ),
        nextInterviewDate: parseDateOrUndefined(
          jae.nextInterviewDate
        ),
      });

      setTagsChanged(jae.tags);
    }
  }, [editModal.data.ja]);

  function handleEditJobApplication(
    application: any,
    applicationId: string
  ) {
    editJobApplication({
      application,
      applicationId,
      type: "allChange",
    });
  }

  function changeDateValuesFromUndefinedToNull(values: any) {
    // console.log("valls", {
    //   nextInterviewDate: values.nextInterviewDate,
    //   applicationDeadline: values.applicationDeadline,
    //   postedDate: values.postedDate,
    // });
    if (values.nextInterviewDate === undefined) {
      values.nextInterviewDate = null;
    }
    if (values.applicationDeadline === undefined) {
      values.applicationDeadline = null;
    }
    if (values.postedDate === undefined) {
      values.postedDate = null;
    }
    return values;
  }
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log("edit values", values);
    let valuesToSend = { ...values };

    valuesToSend = changeDateValuesFromUndefinedToNull(valuesToSend);

    handleEditJobApplication(valuesToSend, jae.id);
    // editModal.onClose();
  }

  //effect description
  useEffect(() => {
    // minimise collapsable after closing the edit modal
    setIsOpen(false);
  }, [editModal.isOpen]);

  return (
    <div className="space-y-4 py-2 pb-4 ">
      {form.formState.errors && (
        <div>{JSON.stringify(form.formState.errors)}</div>
      )}
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
            onOpenChange={setIsOpen}
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
              {/* Notes */}
              {/* Note will be updated differently */}
              {/* <div className="flex gap-1 mb-3 ">
                <TextareaField
                  form={form}
                  fieldName="note"
                  label="Edit notes"
                />
              </div> */}
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
              {/* Edit todos not allowed they have separate form  */}
              {/* <div className="flex gap-1 mb-3 ">
                <TextareaField
                  form={form}
                  fieldName="todos"
                  label="Edit todos"
                />
              </div> */}
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
              type="button"
              variant={"ghost"}
              onClick={() => dialogControl.closeModal("editJA")}
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              type="submit"
              // onClick={() => {
              //   onSubmit(form.getValues());
              // }}
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
