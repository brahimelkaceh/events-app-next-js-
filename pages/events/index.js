import EventList from "@/components/events/EventList";
import EventSearch from "@/components/events/EventSearch";
import { getAllEvents } from "@/helpers/api-utils";
import { useRouter } from "next/router";
import { Fragment } from "react";

const EventsPage = ({ events }) => {
  const router = useRouter();
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
export const getStaticProps = async () => {
  const events = await getAllEvents();
  return {
    props: {
      events,
    },
    revalidate: 1800,
  };
};
