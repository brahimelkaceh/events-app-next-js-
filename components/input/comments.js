import { useEffect, useState } from "react";

import classes from "./comments.module.css";
import NewComment from "./new-commnet";
import CommentList from "./comment-list";

function Comments({ eventId }) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const handleSubmit = async (data) => {
    try {
      const response = await fetch("/api/comments/" + eventId, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      const responseData = await response.json();
      setMessage(responseData.message);
      setTimeout(() => {
        setMessage("");
      }, 1500);
    } catch (error) {
      console.error("Error submitting comment:", error);
      setError("Failed to submit comment. Please try again.");
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/comments/" + eventId);
        const commentsData = await response.json();
        setComments(commentsData.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError("Failed to fetch comments. Please try again.");
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
      {error && <p style={{ color: "red" }}>{error}</p>}
    </section>
  );
}

export default Comments;
