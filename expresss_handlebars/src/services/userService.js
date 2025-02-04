import User from "../models/User.js";
import bcrypt from "bcrypt";
export default {
    async register(data) {
        try {
            const password = await bcrypt.hash(data.password, 10);
            return await User.create({ ...data, password });
        } catch (error) { return error; }
    },
};