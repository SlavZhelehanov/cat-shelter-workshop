import express from 'express';
import { engine } from 'express-handlebars';
import mongoose from "mongoose";
import routes from "./routes/index.js";
import constants from "./util/constants.js";
import middlewares from "./util/middlewares.js";
import cookieParser from "cookie-parser";

// DEFINE __dirname
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
    await mongoose.connect(constants.DB_URI);
    console.log("DB is now connected");
} catch (error) {
    console.error(error);
}
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(middlewares.verify);
app.use(middlewares.methoOverride);

// SETUP VIEW ENGINE
app.engine('hbs', engine({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'main',
    partialsDir: __dirname + '/views/partials/',
    runtimeOptions: { allowProtoPropertiesByDefault: true }
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

// --------------------------------------- ROUTES ---------------------------------------

app.use(routes);

app.listen(constants.PORT, console.log(`Server is listening on http://localhost:${constants.PORT}...`));