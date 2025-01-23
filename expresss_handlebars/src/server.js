import express from 'express';
import { engine } from 'express-handlebars';

// DEFINE __dirname
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// HANDLE READING/WRITING TO DATABASE
function readData(file) {
    const data = fs.readFileSync(file);
    return JSON.parse(data);
}

function writeData(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// GLOBAL VARIABLAS
let cats = readData(catsPath);
let breeds = readData(breedsPath);

// MIDDLEWARES
server.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
server.use(express.urlencoded({ extended: true }));

// SETUP VIEW ENGINE
app.engine('hbs', engine({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'main',
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

// --------------------------------------- ROUTES ---------------------------------------
// HOME
app.get('/', (req, res) => { return res.render('home', { isHomePage: true }); });

// ADD BREED
app.get('/cats/add-breed', (req, res) => { return res.render('addBreed'); });

// ADD CAT
app.get('/cats/add-cat', (req, res) => { return res.render('addCat'); });

// 404 LIKE
app.all("*", (req, res) => { return res.redirect('/'); });

app.listen(3000, console.log("Server is listening on port: 3000"));