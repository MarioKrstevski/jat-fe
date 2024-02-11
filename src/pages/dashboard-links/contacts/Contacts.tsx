import { api } from "@/api/backend";
import Upcomming from "@/components/Upcomming";
import { useQuery } from "@tanstack/react-query";
import ContactList from "./components/ContactList";

export default function Contacts() {
  const {
    data: contacts,
    isLoading,
    error,
  } = useQuery({
    initialData: [],
    queryKey: ["contacts"],
    queryFn: api.contacts.getContacts,
    // staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!contacts) return <div>No contacts found</div>;

  return (
    <>
      <ContactList contacts={contacts} />
      <Upcomming imgSrc="https://img001.prntscr.com/file/img001/Sftc56HLRJOrh9YZ-M3pmw.png" />
      <Upcomming imgSrc="https://img001.prntscr.com/file/img001/V4T82AafRuqKvJCw7QE0aQ.png" />
    </>
  );
}
