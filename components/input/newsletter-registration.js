import { useContext, useRef } from "react";

import classes from "./newsletter-registration.module.css";
import NotificationContext from "@/store/notification-context";

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  const registrationHandler = async (e) => {
    e.preventDefault();
    try {
      const enteredEmail = emailInputRef.current.value;
      notificationCtx.showNotification({
        title: "Signing up...",
        message: "Registering for newsletter...",
        status: "pending",
      });
      const response = await fetch("/api/newsletter/newsletter", {
        method: "POST",
        body: JSON.stringify({ email: enteredEmail }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        // Handle non-successful responses (e.g., 4xx or 5xx status codes)
        console.log(response);
        const errorMessage = await response.text(); // or response.json() if error response is in JSON format
        notificationCtx.showNotification({
          title: "Failed Registration",
          message: "Failed to register... Please try again!!",
          status: "error",
        });
        throw new Error(`Failed to register: ${errorMessage}`);
      }

      const data = await response.json();

      // Handle success
      notificationCtx.showNotification({
        title: "Registration Successful",
        message: "You have been successfully registered.",
        status: "success",
      });
    } catch (error) {
      // Handle errors here
      console.error("Registration failed:", error.message);
      // You might want to notify the user or log the error somewhere
      notificationCtx.showNotification({
        title: "Failed Registration",
        message: "Failed to register... Please try again!!",
        status: "error",
      });
    }
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
