import connectMongo from "@/database/conn";
import UserBlogImage from "@/models/userBlogImageSchema";


const handler = async (req, res) => {
  let blogs = await UserBlogImage.find();
  return res.status(200).json({ blogs });
};
export default connectMongo(handler);
