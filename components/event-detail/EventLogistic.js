import AddressIcon from "../icons/AddressIcon";
import DateIcon from "../icons/DateIcon";
import LogisticsItem from "./LogisticsItem";
import classes from "./event-logistics.module.css";

function EventLogistic({ event }) {
  const humanReadableDate = new Date(event.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const addressText = event?.location?.replace(", ", "\n");

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <img src={`${event.image}`} alt={event.imageAlt} />
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default EventLogistic;
