import Link from "next/link";

import classes from "./main-header.module.css";

function MainHeader() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">NextEvents V3 </Link>
        {/* <span
          style={{
            fontSize: "12px",
          }}
        >
          (api routes)
        </span> */}
      </div>
      <nav className={classes.navigation}>
        <ul>
          <li>
            <Link href="/events">Browse All Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
