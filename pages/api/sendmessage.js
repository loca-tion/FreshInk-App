import connectMongo from "@/database/conn";
import UserContact from "@/models/userContactSchema";

export default async function handler(req, res) {
  connectMongo();

  if (req.method === "POST") {
    if (!req.body) {
      res.status(404).json({ error: "Don't have contact data...!" });
    }
    const { email, subject, message } = req.body;
    try {
      const newContact = await UserContact.create({
        email,
        subject,
        message,
      });
      res.status(201).json({ status: true, usercontact: newContact });
    } catch (error) {
      res.status(404).json({ error });
    }
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only POST accepted" });
  }
}
