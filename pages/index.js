import EventList from "@/components/events/EventList";
import NewsletterRegistration from "@/components/input/newsletter-registration";
import { getFeaturedEvents } from "@/helpers/api-utils";
import Head from "next/head";

const Home = ({ data }) => (
  <div>
    <Head>
      {/* Add your custom head elements here */}
      <title>Next Js Events</title>
      <meta name="description" content="Your page description" />
      {/* Other meta tags, stylesheets, scripts, etc. */}
    </Head>
    <NewsletterRegistration />
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
