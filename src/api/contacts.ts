import { Contact } from "@/types";
import { jatbe } from "./instance";
import { AxiosResponse } from "axios";

async function getContacts(): Promise<AxiosResponse<Contact[]>> {
  return jatbe.get("contacts");
}

async function createContact(
  contactData: any
): Promise<AxiosResponse<Contact[]>> {
  return jatbe.post("contacts", { contactData });
}

export const contacts = {
  getContacts,
  createContact,
};
