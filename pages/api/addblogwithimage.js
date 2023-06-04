import connectMongo from "@/database/conn";
import UserBlogImage from "@/models/userBlogImageSchema";

export default async function handler(req, res) {
  connectMongo();
  if (req.method === "POST") {
    if (!req.body) {
      return res.status(404).json({ error: "Don't have blog data...!" });
    }
    const { username, title, highlight, category, blog, image } = req.body;
    try {
      const newBlog = await UserBlogImage.create({
        username,
        title,
        highlight,
        category,
        blog,
        image,
      });
      res.status(201).json({ status: true, userblog: newBlog });
    } catch (error) {
      res.status(404).json({ error });
    }
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only POST accepted" });
  }
}
