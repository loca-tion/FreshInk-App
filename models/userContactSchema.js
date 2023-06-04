import { Schema , model , models } from "mongoose";

const userContactSchema = new Schema({
    email:String,
    subject:String,
    message:String,
}, { timestamps: true });

const UserContact = models.usercontact || model('usercontact',userContactSchema);

export default UserContact;