import Link from "next/link";
import React from "react";
import classes from "./event-item.module.css";
import Button from "../ui/Button";
import AddressIcon from "../icons/AddressIcon";
import DateIcon from "../icons/DateIcon";
import ArrowIcon from "../icons/ArrowIcon";
const EventItem = ({ event }) => {
  const readableDate = new Date(event.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <li className={classes.item}>
      <img src={event.image} alt={event.title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{event.title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{readableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{event?.location?.replace(", ", "\n")}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={`/events/${event.id}`}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
