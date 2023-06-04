import connectMongo from "@/database/conn";
import UserBlogImage from "@/models/userBlogImageSchema";

export default async function handler(req, res) {
  connectMongo();
  if (req.method == "GET") {
    try {
      const { blogtitle } = req.query;
      if (blogtitle) {
        const blog = await UserBlogImage.findById(blogtitle);
        res.status(200).json(blog);
      }
      res.status(404).json({ error: "Blog not selected" });
    } catch (error) {
      res.status(404).json({ error: "Cannot get the blog ... !" });
    }
  }
}
