import { useRef, useState } from "react";
import classes from "./new-comment.module.css";

function NewComment({ onSubmit, message }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation - you may want to add more thorough validation
    if (!email || !name || !comment) {
      setError("Please fill in all fields.");
      return;
    }

    // Additional validation for email format
    if (!isValidEmail(email)) {
      setError("Invalid email address.");
      return;
    }

    // Assuming you have an onSubmit prop for handling the form data
    onSubmit({ email, name, comment });

    // Clear the form and reset error state on successful submission
    setEmail("");
    setName("");
    setComment("");
    setError("");
  };
  // Function to validate email format
  const isValidEmail = (email) => {
    // Implement your own email validation logic or use a library like validator.
    // For simplicity, let's assume a basic email format check here.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="email">Your email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor="comment">Your comment</label>
        <textarea
          id="comment"
          rows="5"
          value={comment}
          onChange={(e) => setComment(e.target.value.trim())}
        ></textarea>
      </div>
      {error && <p style={{ color: "#b62000", margin: 0, p: 0 }}>{error}</p>}
      {message && (
        <p style={{ color: "#333", margin: 0, p: 0 }}>{message}</p>
      )}{" "}
      <button className={classes.btn}>Submit</button>
    </form>
  );
}

export default NewComment;
