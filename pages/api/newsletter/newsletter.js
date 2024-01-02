import { connectToDatabase, insertDocument } from "@/helpers/db-util";
import { MongoClient } from "mongodb";

const handleNewsletter = async (req, res) => {
  try {
    if (req.method !== "POST") {
      throw new Error("Invalid request method. Expected POST.");
    }

    const email = req.body.email;

    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      throw new Error("Invalid email address.");
    }

    const client = await connectToDatabase();

    await insertDocument(client, "emails", { email });
    client.close();

    // Save the email to your database or perform any necessary actions.

    res.status(200).json({ message: "Success", data: email });
  } catch (error) {
    console.error("Error handling newsletter subscription:", error.message);
    res.status(400).json({ message: "Bad Request", error: error.message });
  }
};

// Function to validate email format
const isValidEmail = (email) => {
  // Implement your own email validation logic or use a library like validator.
  // For simplicity, let's assume a basic email format check here.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default handleNewsletter;
