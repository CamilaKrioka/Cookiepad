process.env.BASE_URL   = 'http://localhost:8080/';
process.env.IMAGES_URL = process.env.BASE_URL + 'images/';

const express = require('express');
const cors = require ('cors');
const bodyParser = require ('body-parser');
const fileUpload = require ('express-fileupload');

const recetasRoutes = require('./routes/recetas_routes');
const sessionRoutes = require ('./routes/session_Routes');
const favoritosRoutes = require('./routes/favoritos_routes');
const categoriasRoutes = require('./routes/categorias_tags_routes');
const modosRoutes = require('./routes/ModosRoutes');


const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(fileUpload());
 
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const auth = require('./auth');

app.use(express.static('../public'));

app.use( cors({
    credentials: true,
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type']
})
)

app.use( session({
    store : new FileStore,
    secret : '123456',
    resave: false,
    saveUninitialized: true,
    name: 'cookiepad'
}))
app.use('/auth', sessionRoutes);
app.use('/recetas', recetasRoutes);
app.use('/favoritos', favoritosRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/modos', modosRoutes);

app.listen(8080, ()=>{ console.log('Escuchando....')} );