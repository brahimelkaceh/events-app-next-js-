import EventContent from "@/components/event-detail/EventContent";
import EventLogistic from "@/components/event-detail/EventLogistic";
import EventSummary from "@/components/event-detail/EventSummary";
import Comments from "@/components/input/comments";
import { getAllEvents, getEventById } from "@/helpers/api-utils";
import Head from "next/head";
import { Fragment } from "react";

const EventDetailPage = ({ event }) => {
  if (!event) {
    return <h2>No Event Found!</h2>;
  }
  return (
    <Fragment>
      <Head>
        {/* Add your custom head elements here */}
        <title>{event.title}</title>
        <meta name="description" content="Your page description" />
        {/* Other meta tags, stylesheets, scripts, etc. */}
      </Head>
      <EventSummary title={event.title} />
      <EventLogistic event={event} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
};

export default EventDetailPage;

export const getStaticPaths = async () => {
  const data = await getAllEvents();
  const params = data?.map((person) => ({ params: { id: person.id } })) || [];

  return {
    paths: params,
    fallback: false, // false or "blocking"
  };
};

export const getStaticProps = async (context) => {
  const eventId = context.params.id;
  const event = await getEventById(eventId);
  return {
    props: { event },
    revalidate: 60,
  };
};
