import mongoose, { Schema, } from "mongoose";
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
export const UserData = mongoose.model('User', userSchema);
//# sourceMappingURL=userModel.js.map