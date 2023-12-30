import EventList from "@/components/events/EventList";
import { getFeaturedEvents } from "@/helpers/api-utils";

const Home = ({ data }) => (
  <div>
    <EventList events={data} />
  </div>
);

export default Home;

export const getStaticProps = async () => {
  const data = await getFeaturedEvents();
  return {
    props: {
      data,
    },
    revalidate: 1800,
  };
};
