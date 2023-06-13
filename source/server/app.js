//Importaciones de librerias
const express = require ('express');
const cors = require ('cors');
const path = require ('path');
const {create} = require ('express-handlebars');

//Ejecutamos express
let app = express();

//Creamos instancia handlebars
const hbs = create({
    partialsDir: ["views/partials/"]
});

//Se ajusta handlebars como motor de plantilla
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');

//Activamos middlewares
app.use(cors());
app.use(express.json());

//Hacemos publica la carpeta bootstrap
app.use('/bootstrap', express.static(__dirname+'/node_modules/bootstrap/dist/'));

//Publicamos carpeta public
app.use(express.static('public'));

//Exportamos el modulo
module.exports = app;

