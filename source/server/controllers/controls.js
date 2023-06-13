//Importaciones iniciales
const fs = require('fs');
const {v4: uuid} = require('uuid');
const {leerArchivo, escribirArchivo} = require('./utils.js');

//Creamos la clase y los métodos
class Anime {
    constructor (nombre, genero, año, autor){        
        this.nombre = nombre;
        this.genero = genero;
        this.año = año;
        this.autor = autor;
    }
    async findAll(){
        let data = await leerArchivo('anime.json');        
        return data
    }

    async findById(id){
        let todos = await this.findAll();
        let animeNombre = todos.find(anime => anime.nombre.toLowerCase() == id.toLowerCase());
        let animeId = todos.find(anime => anime.id.toLowerCase() == id.toLowerCase());
        if(animeNombre){
            return animeNombre
        } else if (animeId) {
            return animeId;
        } else {
            return false;
        }
    };

    //Se duerme funcion, para demostrar que se pudo hacer en una sola (anterior)
    /* async findByName(nombre){
        let animes = await this.findAll()
        if (nombre) {
            let result = animes.find(anime => anime.nombre.toLowerCase() == nombre.toLowerCase());
            console.log(result);
            return result;
        } else {           
            return false
        }
    } */
    
    async create(){
        let todos = await this.findAll()
        let id = uuid().slice(0,6);
        let nuevoAnime = {
            id: id,
            nombre: this.nombre,
            genero: this.genero,
            año: this.año,  
            autor: this.autor
        }
        todos.push(nuevoAnime);
        await escribirArchivo('anime.json', todos)
        return nuevoAnime;
    }


    async delete(id){
        let todos = await this.findAll()
        todos = todos.filter(anime => anime.id != id);
        escribirArchivo('anime.json', todos);
        return todos
    }
    /* async update(id){
        todos = todos.filter(anime => anime.id != id);
        escribirArchivo('anime.json', todos);
        return todos
    } */
    async update(id){
        let identificador = id || this.id;
        let todos = await this.findAll()
        let newAnime = todos.find(anime => anime.id == identificador);

        if ( newAnime ) {
            newAnime.nombre = this.nombre;
            newAnime.genero = this.genero;
            newAnime.año = this.año;
            newAnime.autor = this.autor;
            await escribirArchivo('anime.json', todos);
            return newAnime;
        } else {
            return false
        }
    }    
};

module.exports = Anime;