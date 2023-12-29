import EventContent from "@/components/event-detail/EventContent";
import EventLogistic from "@/components/event-detail/EventLogistic";
import EventSummary from "@/components/event-detail/EventSummary";
import { getEventById } from "@/dummy-data";
import { useRouter } from "next/router";
import { Fragment } from "react";

const EventDetailPage = () => {
  const router = useRouter();
  const event = getEventById(router.query.id);

  if (!event) {
    return <h2>N Event Found!</h2>;
  }
  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistic event={event} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export default EventDetailPage;
