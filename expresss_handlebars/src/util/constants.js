export default {
    DB_URI: "mongodb://127.0.0.1:27017/cat_shelter_workshop",
    PORT: process.env.PORT || 3000,
    COOKIE_NAME: "Authentication",
    SUPER_SECRET: "7bHo2UZTAKpef6V/q1wYpisnOyNFHMpZMm60ubNg4Wg="
};

// GENERATE SUPER SECRET RANDOM STRING
// import { randomBytes } from "crypto";
// randomBytes(32, (err, buff) => console.log(buff.toString("base64")));