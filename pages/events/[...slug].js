import EventList from "@/components/events/EventList";
import ResultTitle from "@/components/events/ResultTitle";
import Button from "@/components/ui/Button";
import { getFilteredEvents } from "@/dummy-data";
import { useRouter } from "next/router";
import { Fragment } from "react";

const FilterEventsPage = () => {
  const router = useRouter();
  const filteredData = router.query.slug;
  if (!filteredData) {
    return <p className="center">Loading...</p>;
  }
  const year = +filteredData[0];
  const month = +filteredData[1];

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month > 12 ||
    month < 1
  ) {
    return (
      <Fragment>
        <p className="center">Invalid Enter. Please adjust your values!</p>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }
  const events = getFilteredEvents({ year, month });

  if (!events || events.length === 0) {
    return (
      <Fragment>
        <p className="center">No Events Found !</p>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }
  const date = new Date(year, month - 1);
  return (
    <Fragment>
      <ResultTitle date={date} />
      <EventList events={events} />
    </Fragment>
  );
};

export default FilterEventsPage;
