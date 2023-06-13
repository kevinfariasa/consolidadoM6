//Invocamos fs
const fs = require('fs');

//Se crean funciones de lectura, escritura
const leerArchivo = (archivo)=>{
    return new Promise((resolve,reject)=>{
        fs.readFile(`./db/${archivo}`, 'utf8', (error, data)=>{
            if(error){
                console.log(error);
                reject('Error al leer el archivo');
            }
            resolve(JSON.parse(data))
        })
})
};

const escribirArchivo = (archivo, data)=>{
    return new Promise((resolve,reject)=>{
        fs.writeFile(`./db/${archivo}`, JSON.stringify(data, null, 4), 'utf8', (error)=>{
            if(error){
                console.log(error);
                reject('Error al escribir el archivo');
            }
            resolve('Se ha escrito en el archivo')
        })
})
};

module.exports = {
    leerArchivo, escribirArchivo
};