import { UserData } from "../models/index.js";
import bcryptjs from "bcryptjs";
export const RegisterUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const findExistingUser = await UserData.findOne({ email });
        if (findExistingUser)
            return res.status(409).json({ success: false, message: "User already exists" });
        const passwordHashed = await bcryptjs.hash(password, 10);
        const newUser = new UserData({ firstName, lastName, email, password: passwordHashed });
        const user = await newUser.save();
        if (user) {
            return res.status(201).json({ success: true, message: "User created successfully", user });
        }
        else {
            return res.status(500).json({ success: false, message: "Something went wrong" });
        }
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};
//# sourceMappingURL=userController.js.map