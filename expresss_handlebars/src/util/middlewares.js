import jwt from "jsonwebtoken";
import constants from "./constants.js";

export default {
    sign(user, res) {
        const token = jwt.sign(user, constants.SUPER_SECRET, { expiresIn: "1h" });
        res.cookie(constants.COOKIE_NAME, token, { httpOnly: true, secure: false });
    },
    verify(req, res, next) {
        const token = req.cookies[constants.COOKIE_NAME];

        if (!token) {
            delete req.user;
            delete res.locals.user;
            return next();
        }

        jwt.verify(token, constants.SUPER_SECRET, (err, user) => {
            if (err) {
                console.log(err.message);
                delete req.user;
                delete res.locals.user;
                return next();
            }
            req.user = user; // Save user info for the next middleware
            res.locals.user = user;
            return next();
        });
    },
    isUser(req, res, next) {
        if (req.user) return next();
        return res.redirect("/users/login");
    },
    isGuest(req, res, next) {
        if (req.user) return res.redirect("/");
        return next();
    },
    methoOverride(req, res, next) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            req.method = req.body._method;
            delete req.body._method;
        }
        if (req.query && typeof req.query === 'object' && '_method' in req.query) {
            req.method = req.query._method;
            delete req.query._method;
        }
        return next();
    }
};