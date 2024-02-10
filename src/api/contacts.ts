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

async function updateContact(
  contactData: any,
  contactId: string
): Promise<AxiosResponse<Contact>> {
  return jatbe.patch("contacts", { contactData, contactId });
}
async function deleteContact(
  contactId: string
): Promise<AxiosResponse<Contact>> {
  return jatbe.delete("contacts", { data: { contactId } });
}
export const contacts = {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
