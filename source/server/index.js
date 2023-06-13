//Importaciones
const app = require('./app');
const Anime = require('./controllers/controls.js');

const PORT = 3000;


//Inicializamos el servidor
let server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

//RUTAS VISTAS
//Inicio
app.get(['/', '/home'], (req, res) => {
    res.render('home')
});

app.get('/about', (req, res) => {
    res.render('about')
});

//Muestra todos los animes
app.get('/animes', async (req, res) => {
    try {
        let todos = new Anime
        let final = await todos.findAll();
        res.render('allAnimes', {
            target: final
        })
    } catch (error) {
        res.render('allAnimes', {
            error
        })
    }
})

//Busqueda por ID
app.get('/animes/:id', async (req, res) => {
    try {
        let id = String(req.params.id);
        let todos = new Anime;
        let final = await todos.findById(id);        
        res.render('anime', {
            target: [final]
        })
    } catch (error) {
        res.render('anime', {
            error,
        })
    }
})

//Busqueda por Nombre
app.get('/animes/nombre/:nombre', async (req, res) => {
    try {
        //let id = req.params.id;
        let { nombre } = req.params //es lo mismo de arriba
        let todos = new Anime;
        let final = await todos.findByName(nombre);
        //console.log(final);
        res.render('anime', {
            target: [final]
        })
    } catch (error) {
        res.render('anime', {
            error,
        })
    }
});

//Borrar elemento
app.delete('anime/:id', async (req, res) => {
    try {
        let id = req.params.id
        let todos = new Anime
        let final = await todos.delete()
        res.render('anime', {
            target: [final]
        })
    } catch (error) {
        res.render('anime', {
            error
        })

    }
})

//Rutas ENDPOINT
//Crear Animé
app.post('/animes', async (req, res) => {
    try {
        let { nombre, genero, año, autor } = req.body;
        let newAnime = new Anime(nombre, genero, año, autor);
        let respuesta = await newAnime.create();
        res.status(201).send({
            code: 201,
            message: respuesta
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            code: 500,
            message: 'error al guardar el anime.'
        })
    }
})

//Actualizar Animé
app.put('/animes', async (req, res) => {
    try {
        let { id, nombre, genero, año, autor } = req.body;
        let newUser = new Anime(nombre, genero, año, autor);
        let respuesta = await newUser.update(id);
        console.log(respuesta)
        if (respuesta) {
            res.status(200).send({ code: 200, message: 'whohu! Exito!' })
        } else {
            res.status(500).send({
                code: 500,
                message: 'Algo salió muy mal..... :O'
            })
        }
    } catch (error) {
        console.log(error)
    }
})

//Eliminar Animé
app.delete('/animes/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let eliminar = new Anime;
        await eliminar.delete(id);
        res.send({
            message: "Eliminado con éxito"
        })
    } catch (error) {
        res.status(500).send({
            message: error
        })
    }
})
//Fin
app.all("*", (req, res) => {
    res.status(200).send(`Ruta ${req.method} no encontrada.`);
});

module.exports = server;


