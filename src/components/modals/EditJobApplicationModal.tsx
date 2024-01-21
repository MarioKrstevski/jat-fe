"use client";

import { Modal } from "../ui/custom/modal";
import { optional, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectGroup,
  SelectContent,
  Select,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import StateSelector from "../StateSelector";
import { JobApplication, JobApplicationStatus } from "@/types";
import { Checkbox } from "../ui/checkbox";
import { DateTimePicker } from "../DateTimePicker";
import { set } from "date-fns";
import { useAuth } from "@clerk/clerk-react";
import { defaultStatusOptions } from "@/global/values";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronsUpDownIcon } from "lucide-react";
import { useEditModal } from "@/hooks/useEditModal";
import { api } from "@/api/backend";
import { useJobApplicationsStore } from "@/hooks/useJobApplicationsStore";

const formSchema = z.object({
  // userId: z.string(),
  id: z.string(),
  companyName: z.string(),
  jobTitle: z.string(),
  status: z.string(),
  jobLocation: z.string().optional(),
  jobDescription: z.string().optional(),
  companyInfo: z.string().optional(),
  applylink: z.string().optional(),
  link: z.string().optional(),
  waitingFor: z.string().optional(),
  timeline: z.string().optional(),
  statusOptions: z.string().optional(),
  resumeUsed: z.string().optional(),
  motivationalLetter: z.string().optional(),
  notes: z.string().optional(),
  interestLevel: z.number().min(0).max(5).optional(),
  isRemote: z.boolean().optional(),
  referredBy: z.string().optional(),
  wasReferred: z.boolean().optional(),
  postedDate: z.date().optional(),
  applicationDeadline: z.date().optional(),
  salaryDetails: z.string().optional(),
  nextInterviewDate: z.date().optional(),
  appliedFrom: z.string().optional(),
  heardAboutFrom: z.string().optional(),
  mapLocation: z.string().optional(),
  todos: z.string().optional(),
  companyId: z.string().nullable(),
});

export default function EditJobApplicationModal() {
  const { userId } = useAuth();
  const editModal = useEditModal();
  const jobApplicationStore = useJobApplicationsStore();

  const jobApplicationEditted = editModal.data.ja;
  const jae = jobApplicationEditted;

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // userId: userId!,
      id: jae?.id!,
      companyName: jae?.companyName,
      jobTitle: jae?.jobTitle,
      jobLocation: jae?.jobLocation,
      status: jae?.status,
      jobDescription: jae?.jobDescription,
      companyInfo: jae?.companyInfo,
      applylink: jae?.applylink,
      link: jae?.link,
      waitingFor: jae?.waitingFor,
      timeline: jae?.timeline,
      statusOptions: jae?.statusOptions,
      resumeUsed: jae?.resumeUsed,
      motivationalLetter: jae?.motivationalLetter,
      notes: jae?.notes,
      salaryDetails: jae?.salaryDetails,
      appliedFrom: jae?.appliedFrom,
      heardAboutFrom: jae?.heardAboutFrom,
      mapLocation: jae?.mapLocation,
      todos: jae?.todos,
      companyId: jae?.companyId,
      interestLevel: jae?.interestLevel,
      isRemote: jae?.isRemote,
      wasReferred: jae?.wasReferred,
      referredBy: jae?.referredBy,
      postedDate: jae?.postedDate
        ? new Date(jae?.postedDate)
        : undefined,
      applicationDeadline: jae?.applicationDeadline
        ? new Date(jae?.applicationDeadline)
        : undefined,
      nextInterviewDate: jae?.nextInterviewDate
        ? new Date(jae?.nextInterviewDate)
        : undefined,
    },
  });

  // this reset is important to update the data if we open a job close it and open
  // another one which has a new date, this needs to update it since we are using one
  // modal for all the jobs

  useEffect(() => {
    if (jae) {
      form.reset({
        // userId: userId!,
        id: jae.id!,
        companyName: jae.companyName,
        jobTitle: jae.jobTitle,
        jobLocation: jae.jobLocation,
        status: jae.status,
        jobDescription: jae.jobDescription,
        companyInfo: jae.companyInfo,
        applylink: jae.applylink,
        link: jae.link,
        waitingFor: jae.waitingFor,
        timeline: jae.timeline,
        statusOptions: jae.statusOptions,
        resumeUsed: jae.resumeUsed,
        motivationalLetter: jae.motivationalLetter,
        notes: jae.notes,
        salaryDetails: jae.salaryDetails,
        appliedFrom: jae.appliedFrom,
        heardAboutFrom: jae.heardAboutFrom,
        mapLocation: jae.mapLocation,
        todos: jae.todos,
        companyId: jae.companyId,
        interestLevel: jae.interestLevel,
        isRemote: jae.isRemote,
        wasReferred: jae.wasReferred,
        referredBy: jae.referredBy,
        postedDate: jae.postedDate
          ? new Date(jae.postedDate)
          : undefined,
        applicationDeadline: jae.applicationDeadline
          ? new Date(jae.applicationDeadline)
          : undefined,
        nextInterviewDate: jae.nextInterviewDate
          ? new Date(jae.nextInterviewDate)
          : undefined,
      });
    }
  }, [editModal.data.ja]);

  function handleEditJobApplication(
    jobApplication: any,
    userId: string
  ) {
    setIsLoading(true);
    api
      .be_editJobApplication(jobApplication, userId, "allChange")
      .then((res) => {
        console.log("res.data", res.data);

        const newJobApplicationsArray =
          jobApplicationStore.jobApplications.map((ja) => {
            if (ja.id === jobApplication.id) {
              return res.data;
            } else {
              return ja;
            }
          });

        jobApplicationStore.setData(newJobApplicationsArray);
        form.reset();
        toast.success("Job application updated");
        editModal.onClose();
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("edit values", values);
    handleEditJobApplication(values, userId!);
    // editModal.onClose();
  }

  //effect description
  useEffect(() => {
    // minimise collapsable after closing the edit modal
    setIsOpen(false);
  }, [editModal.isOpen]);

  return (
    <Modal
      title="Edit information"
      description={`Change what you need`}
      isOpen={editModal.isOpen}
      onClose={editModal.onClose}
    >
      <div className="space-y-4 py-2 pb-4 ">
        {/* {form.formState.errors && (
          <div>{JSON.stringify(form.formState.errors)}</div>
        )} */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Company Name */}
            <div>
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => {
                  return (
                    <FormItem className="pb-2">
                      <FormLabel>Company Name *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Google" />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            </div>
            {/* Job Position */}
            <div>
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => {
                  return (
                    <FormItem className="pb-2">
                      <FormLabel>Job Title *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Software Engineer"
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            </div>
            {/* Status + Waiting For */}
            <div className="flex gap-4 mb-3">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => {
                  return (
                    <FormItem className="flex-1">
                      <FormLabel>Status *</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(selection) => {
                            form.setValue("status", selection);
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select columns" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {/* <SelectLabel>Columns</SelectLabel> */}
                              {defaultStatusOptions.map((option) => {
                                return (
                                  <SelectItem
                                    value={option}
                                    key={option}
                                  >
                                    {option}
                                  </SelectItem>
                                );
                              })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="waitingFor"
                render={({ field }) => {
                  return (
                    <FormItem className="flex-1">
                      <FormLabel className="">Next Step</FormLabel>
                      <FormControl className="">
                        <Select
                          value={field.value}
                          onValueChange={(selection) => {
                            form.setValue("waitingFor", selection);
                          }}
                        >
                          <SelectTrigger className=" w-full">
                            <SelectValue placeholder="Select columns" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {/* <SelectLabel>Columns</SelectLabel> */}
                              {defaultStatusOptions.map((option) => {
                                return (
                                  <SelectItem
                                    value={option}
                                    key={option}
                                  >
                                    {option}
                                  </SelectItem>
                                );
                              })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  );
                }}
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
                  <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => {
                      return (
                        <FormItem className="pb-2">
                          <FormLabel>Job Posting Link</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="www.linkedin.com/jobs/..."
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
                {/* Job Location */}
                <div>
                  <FormField
                    control={form.control}
                    name="jobLocation"
                    render={({ field }) => {
                      return (
                        <FormItem className="pb-2">
                          <FormLabel>Job Location</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="City, Country, Address"
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                  {/* Is Remote */}
                  <FormField
                    control={form.control}
                    name="isRemote"
                    render={({ field }) => {
                      return (
                        <FormItem className="pb-2">
                          {/* <FormLabel>Remote option</FormLabel> */}
                          <FormControl>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="is-remote"
                                checked={field.value}
                                onCheckedChange={(value) => {
                                  console.log("value", value);
                                  form.setValue(
                                    "isRemote",
                                    value as boolean
                                  );
                                }}
                              />
                              <label
                                htmlFor="is-remote"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Is Remote
                              </label>
                            </div>
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
                {/* Job Description */}
                <div>
                  <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => {
                      return (
                        <FormItem className="pb-2">
                          <FormLabel>
                            Job Description{" "}
                            <span className="text-slate-500 font-normal text-sm">
                              (copy paste it)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
                {/* Salary Details */}
                <div className="flex gap-1 mb-3 ">
                  <FormField
                    control={form.control}
                    name="salaryDetails"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex-1">
                          <FormLabel>Salary details</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="ex: $400,000/year; $200/hour; 30K-60K"
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
                {/* Applicatoin Deadline */}
                <div className="flex gap-4 mb-3">
                  <FormField
                    control={form.control}
                    name="applicationDeadline"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Application Deadline</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <DateTimePicker
                                date={field.value}
                                enableClear
                                setDate={(date) => {
                                  form.setValue(
                                    "applicationDeadline",
                                    date
                                  );
                                }}
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
                {/* Posted At */}
                <div className="flex gap-4 mb-3">
                  <FormField
                    control={form.control}
                    name="postedDate"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Posted At Date</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <DateTimePicker
                                date={field.value}
                                enableClear
                                setDate={(date) => {
                                  form.setValue("postedDate", date);
                                }}
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>

                {/* Next Interview Date */}
                <div className="flex gap-4 mb-3 ">
                  <FormField
                    control={form.control}
                    name="nextInterviewDate"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Next Interview Date</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <DateTimePicker
                                date={field.value}
                                enableClear
                                setDate={(date) => {
                                  form.setValue(
                                    "nextInterviewDate",
                                    date
                                  );
                                }}
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
                {/* Was Referred and Referred by */}
                <div className="flex gap-1 mb-3 items-end">
                  <FormField
                    control={form.control}
                    name="wasReferred"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex-1">
                          {/* <FormLabel>Next Interview Date</FormLabel> */}
                          <FormControl>
                            <div className="flex items-center mb-3">
                              <Checkbox
                                id="was-referred"
                                checked={field.value}
                                onCheckedChange={(value) => {
                                  form.setValue(
                                    "wasReferred",
                                    value as boolean
                                  );
                                }}
                              />
                              <label
                                htmlFor="was-referred"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2"
                              >
                                I was referred
                              </label>
                            </div>
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="referredBy"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex-[2]">
                          <FormLabel>Referrered by</FormLabel>
                          <FormControl>
                            <Input
                              className="w-full"
                              {...field}
                              placeholder="Referrered by"
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>

                {/* Interest Level */}
                <div className="flex gap-1 mb-3 ">
                  <FormField
                    control={form.control}
                    name="interestLevel"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex-1">
                          <FormLabel>Interest Level</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              onChange={(e) => {
                                form.setValue(
                                  "interestLevel",
                                  Number(e.target.value)
                                );
                              }}
                              type="number"
                              min={0}
                              max={5}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
                {/* Resume Used + Motivational Used */}
                <div className="flex gap-1 mb-3 ">
                  <FormField
                    control={form.control}
                    name="resumeUsed"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex-1">
                          <FormLabel>Used Resume Link</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Resume Link"
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="motivationalLetter"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex-1">
                          <FormLabel>Motivational Letter</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="ML Link" />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
                {/* Notes */}
                <div className="flex gap-1 mb-3 ">
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex-1">
                          <FormLabel>Add notes</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
                {/* Applied Link + Applied from*/}
                <div className="flex gap-1 mb-3 ">
                  <FormField
                    control={form.control}
                    name="applylink"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex-1">
                          <FormLabel>Link for applying</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="www.linkedin.com/jobs/..."
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="appliedFrom"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex-1">
                          <FormLabel>How did you apply</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="ex: With link, email, in person"
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
                {/* Todos */}
                <div className="flex gap-1 mb-3 ">
                  <FormField
                    control={form.control}
                    name="todos"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex-1">
                          <FormLabel>Add todos</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>

                {/* Heard about from + Map location*/}
                <div className="flex gap-1 mb-3 ">
                  <FormField
                    control={form.control}
                    name="heardAboutFrom"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex-1">
                          <FormLabel className="mb-3.5 inline-block">
                            Job Source
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="ex: Friend, LinkedIn, Indeed"
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="mapLocation"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex-1">
                          <FormLabel>
                            Map Locatoin <br />
                            <div className="text-[10px] text-slate-500">
                              latitude,longitude
                            </div>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="ex: 40.7128,74.0060"
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>

            <div className="pt-6 space-x-2 flex items-center justify-end">
              <Button
                disabled={isLoading}
                type="button"
                variant={"outline"}
                onClick={editModal.onClose}
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
    </Modal>
  );
}
