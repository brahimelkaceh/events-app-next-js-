import EventList from "@/components/events/EventList";
import ResultTitle from "@/components/events/ResultTitle";
import Button from "@/components/ui/Button";
import { getFilteredEvents } from "@/helpers/api-utils";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const FilterEventsPage = () => {
  const [loadedEvents, setLoadedEvents] = useState([]);
  const router = useRouter();
  const filteredData = router.query.slug;
  if (!filteredData) {
    return <p className="center">Loading...</p>;
  }
  const { data, error } = useSWR(
    "https://nextjs-course-e0db5-default-rtdb.firebaseio.com/events.json",
    fetcher
  );
  useEffect(() => {
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(events);
    }
  }, [data]);
  const year = +filteredData[0];
  const month = +filteredData[1];
  const pageHead = (
    <Head>
      {/* Add your custom head elements here */}
      <title>{`all events on ${month}/${year}`}</title>
      <meta name="description" content="Your page description" />
      {/* Other meta tags, stylesheets, scripts, etc. */}
    </Head>
  );
  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month > 12 ||
    month < 1 ||
    error
  ) {
    return (
      <Fragment>
        {pageHead}
        <p className="center">Invalid Enter. Please adjust your values!</p>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHead}
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
      {pageHead}
      <ResultTitle date={date} />
      <EventList events={filteredEvents} />
    </Fragment>
  );
};

export default FilterEventsPage;

// export const getServerSideProps = async (context) => {
//   const { params } = context;
//   const year = +params.slug[0];
//   const month = +params.slug[1];
//   if (
//     isNaN(year) ||
//     isNaN(month) ||
//     year > 2030 ||
//     year < 2021 ||
//     month > 12 ||
//     month < 1
//   ) {
//     return {
//       props: {
//         hasError: true,
//       },
//       // notFound: true,
//       // redirect: {
//       //   destination: "/",
//       // },
//     };
//   }
//   const events = await getFilteredEvents({ year, month });
//   return {
//     props: {
//       events,
//       year,
//       month,
//     },
//   };
// };
