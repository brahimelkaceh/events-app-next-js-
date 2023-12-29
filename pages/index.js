import { getFeaturedEvents } from "@/dummy-data";
import EventsPage from "./events";
import EventList from "@/components/events/EventList";

const Home = () => {
  const featuredEvenets = getFeaturedEvents();
  return (
    <div>
      <EventList events={featuredEvenets} />
    </div>
  );
};

export default Home;
