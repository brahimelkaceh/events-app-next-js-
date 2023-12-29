import EventList from "@/components/events/EventList";
import EventSearch from "@/components/events/EventSearch";
import { getAllEvents, getFilteredEvents } from "@/dummy-data";
import { useRouter } from "next/router";
import { Fragment } from "react";

const EventsPage = () => {
  const router = useRouter();
  const events = getAllEvents();
  const onSearch = (year, month) => {
    router.push(`/events/${year}/${month}`);
  };
  return (
    <Fragment>
      <EventSearch onSearch={onSearch} />
      <EventList events={events} />
    </Fragment>
  );
};

export default EventsPage;
