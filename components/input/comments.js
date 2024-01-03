import { useContext, useEffect, useState } from "react";

import classes from "./comments.module.css";
import NewComment from "./new-commnet";
import CommentList from "./comment-list";
import NotificationContext from "@/store/notification-context";

function Comments({ eventId }) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const notificationCtx = useContext(NotificationContext);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const handleSubmit = async (data) => {
    try {
      notificationCtx.showNotification({
        title: "Loading...",
        message: "Waiting for Creating new Comment...",
        status: "pending",
      });
      const response = await fetch("/api/comments/" + eventId, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        // Handle non-successful responses (e.g., 4xx or 5xx status codes)
        const errorMessage = await response.text(); // or response.json() if error response is in JSON format
        notificationCtx.showNotification({
          title: "Failed Submission",
          message: "Failed to Create new Comment... Please try again!!",
          status: "error",
        });
        throw new Error(`Failed to register: ${errorMessage}`);
      }
      await response.json();
      // Handle success
      notificationCtx.showNotification({
        title: "Commenting Successful",
        message: "You have been successfully Created a comment.",
        status: "success",
      });
    } catch (error) {
      console.error("Registration failed:", error.message);
      // You might want to notify the user or log the error somewhere
      notificationCtx.showNotification({
        title: "Failed Registration",
        message: "Failed to register... Please try again!!",
        status: "error",
      });
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        notificationCtx.showNotification({
          title: "Loading...",
          message: "Waiting for Fetching Comments...",
          status: "pending",
        });
        const response = await fetch("/api/comments/" + eventId);
        if (!response.ok) {
          notificationCtx.showNotification({
            title: "Failed Fetched Comments",
            message: "Failed to fetcing data ... Please try later!!",
            status: "error",
          });
        }
        const commentsData = await response.json();
        setComments(commentsData.comments);
        notificationCtx.showNotification({
          title: "Data Fetched Successful",
          message: "You have been successfully Fetching comments.",
          status: "success",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching comments:", error);
        notificationCtx.showNotification({
          title: "Failed Fetched Comments",
          message: "Failed to fetcing data ... Please try later!!",
          status: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    if (showComments) {
      fetchComments();
    }
  }, [showComments, eventId]);

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onSubmit={handleSubmit} message={message} />}
      {loading && <p>Loading comments...</p>}
      {showComments && !loading && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
