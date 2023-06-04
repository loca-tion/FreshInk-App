import { Schema, model, models } from "mongoose";

const userBlogImageSchema = new Schema(
  {
    username: String,
    title: String,
    highlight: String,
    category: String,
    blog: String,
    image: String,
  },
  { timestamps: true }
);

const UserBlogImage =
  models.userblogwithImage || model("userblogwithImage", userBlogImageSchema);

export default UserBlogImage;
