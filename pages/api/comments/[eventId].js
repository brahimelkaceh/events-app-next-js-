import {
  connectToDatabase,
  getDocument,
  insertDocument,
} from "@/helpers/db-util";

const commnetsHandler = async (req, res) => {
  const eventId = req.query.eventId;

  try {
    const client = await connectToDatabase();

    if (req.method === "GET") {
      const comments = await getDocument(client, "comments", { _id: -1 });
      res.status(200).json({ code: 200, comments });
    } else if (req.method === "POST") {
      const { email, name, comment } = req.body;

      // Basic validation - check if required fields are present
      if (!email || !name || !comment) {
        return res
          .status(400)
          .json({ code: 400, error: "Please provide all required fields." });
      }

      // Additional validation for email format
      if (!isValidEmail(email)) {
        return res
          .status(400)
          .json({ code: 400, error: "Invalid email address." });
      }

      // Your custom validation logic for name and comment can be added here

      // If all validation passes, proceed with the intended logic
      const data = { email, name, comment, eventId };

      // Use try-catch for database operations
      try {
        await insertDocument(client, "comments", data);

        res.status(201).json({
          code: 201,
          message: "Comment Success Created",
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({ code: 500, error: "Internal Server Error" });
      }
    }
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ code: 500, error: "Internal Server Error" });
  }
};

// Function to validate email format
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default commnetsHandler;
