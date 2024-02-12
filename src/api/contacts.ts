// src/api/contacts.ts
import { Contact, Note } from "@/types";
import { jatbe } from "./instance";

interface CreateContactResponse {
  contact: Contact;
  note: Note;
}
async function getContacts(): Promise<Contact[]> {
  return jatbe.get("contacts").then((res) => res.data);
}

async function createContact(
  contactData: any
): Promise<CreateContactResponse> {
  return jatbe
    .post("contacts", { contactData })
    .then((res) => res.data);
}

async function updateContact({
  contactData,
  contactId,
}: {
  contactData: any;
  contactId: string;
}): Promise<Contact> {
  console.log(contactData, contactId);
  return jatbe
    .patch(`contacts/${contactId}`, { contactData })
    .then((res) => res.data);
}

async function deleteContact(contactId: string): Promise<Contact> {
  return jatbe
    .delete(`contacts/${contactId}`)
    .then((res) => res.data);
}

export const contacts = {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
