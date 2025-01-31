import express from 'express';
import { engine } from 'express-handlebars';
import mongoose from "mongoose";
import routes from "./routes/index.js";

// DEFINE __dirname
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const catsPath = path.join(__dirname, "./DB/cats.json");
const breedsPath = path.join(__dirname, "./DB/breeds.json");

try {
    await mongoose.connect("mongodb://127.0.0.1:27017/cat_shelter_workshop");
    console.log("DB is now connected");    
} catch (error) {
    console.error(error);    
}
const app = express();

// // HANDLE READING/WRITING TO DATABASE
// function readData(file) {
//     const data = fs.readFileSync(file);
//     return JSON.parse(data);
// }

// function writeData(file, data) {
//     fs.writeFileSync(file, JSON.stringify(data, null, 2));
// }

// // GLOBAL VARIABLAS
// let cats = readData(catsPath);
// let breeds = readData(breedsPath);

// MIDDLEWARES
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

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
// // HOME
// app.get('/', (req, res) => { return res.render('home', { isHomePage: true, cats }); });

// // ADD BREED
// app.get('/cats/add-breed', (req, res) => { return res.render('addBreed'); });
// app.post('/cats/add-breed', (req, res) => {
//     const breed = req.body.breed.trim();

//     if (0 < breed.length && !breeds.includes(breed)) {
//         breeds.push(breed);
//         writeData(breedsPath, breeds);
//     }
//     return res.redirect("/");
// });

// // ADD CAT
// app.get('/cats/add-cat', (req, res) => { return res.render('addCat', { breeds }); });
// app.post('/cats/add-cat', (req, res) => {
//     let cat = { id: uuid(), name: "", description: "", breed: "", price: 0, image: "" };

//     for (const key in cat) {
//         if (key != "id" && key === "price" && req.body[key]) cat[key] = +req.body[key].trim();
//         if (key != "id" && key != "price" && req.body[key]) cat[key] = req.body[key].trim();
//     }

//     if (0 < cat.name.length && 0 < cat.description.length && 0 < cat.breed.length && 0 < cat.price && 0 < cat.image.length) {
//         cats.push(cat);
//         writeData(catsPath, cats);
//         return res.redirect('/');
//     }
//     return res.render('addCat', { breeds, cat });
// });

// // DELETE CAT
// app.get('/cats/:id/new-home', (req, res) => {
//     const cat = cats.find(c => c.id === req.params.id);
//     if (!cat) return res.redirect('/404');
//     return res.render('catShelter', { cat });
// });
// app.post('/cats/:id/new-home', (req, res) => {
//     const cat = cats.find(c => c.id === req.params.id);
//     if (!cat) return res.redirect('/404');
//     cats = cats.filter(c => c.id != req.params.id);
//     writeData(catsPath, cats);
//     return res.redirect('/');
// });

// // CHANGE INFO
// app.get('/cats/:id/change-info', (req, res) => {
//     const cat = cats.find(c => c.id === req.params.id);
//     if (!cat) return res.redirect('/404');
//     return res.render('editCat', { cat, breeds });
// });
// app.post('/cats/:id/change-info', (req, res) => {
//     const idx = cats.findIndex(u => u.id === req.params.id);
//     if (idx === -1) return res.redirect("/");
//     let cat = { name: "", description: "", breed: "", price: 0, image: "" };

//     for (const key in cat) {
//         if (key === "price" && req.body[key]) cat[key] = +req.body[key].trim();
//         if (key != "price" && req.body[key]) cat[key] = req.body[key].trim();
//     }    

//     if (0 < cat.name.length && 0 < cat.description.length && 0 < cat.breed.length && 0 < cat.price && 0 < cat.image.length) {
//         cats[idx] = { id: req.params.id, ...cat };
//         writeData(catsPath, cats);
//     }
//     return res.redirect('/');
// });

// // 404 LIKE
// app.all("*", (req, res) => { return res.redirect('/'); });

app.listen(3000, console.log("Server is listening on port: 3000"));