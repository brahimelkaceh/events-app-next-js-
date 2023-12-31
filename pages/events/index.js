import EventList from "@/components/events/EventList";
import EventSearch from "@/components/events/EventSearch";
import { getAllEvents } from "@/helpers/api-utils";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";

const EventsPage = ({ events }) => {
  const router = useRouter();
  const onSearch = (year, month) => {
    router.push(`/events/${year}/${month}`);
  };
  return (
    <Fragment>
      <Head>
        {/* Add your custom head elements here */}
        <title>All Events</title>
        <meta name="description" content="Your page description" />
        {/* Other meta tags, stylesheets, scripts, etc. */}
      </Head>
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
