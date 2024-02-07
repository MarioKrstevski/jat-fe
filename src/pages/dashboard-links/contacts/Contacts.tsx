import Upcomming from "@/components/Upcomming";
import { useContactsStore } from "@/hooks/useContactsStore";
import ContactList from "./ContactList";

export default function Contacts() {
  const contactsStore = useContactsStore();

  return (
    <>
      <ContactList contacts={contactsStore.contacts} />

      <Upcomming imgSrc="https://img001.prntscr.com/file/img001/Sftc56HLRJOrh9YZ-M3pmw.png" />
      <Upcomming imgSrc="https://img001.prntscr.com/file/img001/V4T82AafRuqKvJCw7QE0aQ.png" />
    </>
  );
}
