import User from "../models/User.js";
import bcrypt from "bcrypt";
import formValidator from "../util/formValidator.js";

export default {
    async register(data) {
        try {
            const messages = formValidator.loginRegisterUser(data);
            if (0 < messages.length) return { message: messages.join("; ") };
            const password = await bcrypt.hash(data.password, 10);
            return await User.create({ ...data, password });
        } catch (error) { return error; }
    },
    async login(data) {
        try {
            const messages = formValidator.loginRegisterUser(data);
            if (0 < messages.length) return { message: messages.join("; ") };
            
            const user = await User.findOne({ email: data.email });
            if (!user) throw new Error("Wrong credentials!");

            const result = await bcrypt.compare(data.password, user.password);
            if (!result) throw new Error("Wrong credentials!");

            return user._id;
        } catch (error) { return error; }
    }
};