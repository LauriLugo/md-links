const fs = require("fs");
const { existsSync, statSync, readdirSync } = fs;
const path = require("path");
const _resolve = path.resolve;
const calculate = require("./calculate.js");
//Obtiene la ruta y las opciones
const mdLinks = (path, options) => {
  return new Promise(function (resolve, reject) {
    //si no hay opciones dejarlas en false por el test
    if (options === undefined) {
      options = {
        validate: false,
        stats: false,
      };
    }

    //Si la ruta/path está vacía mostrar error
    if (path === "/" || path === undefined) {
      reject("La ruta está vacía");
    }
    //Chequear o convertir a una ruta absoluta
    //Si la ruta es relativa convertirla a absoluta
    if (path[0] !== "/") {
      path = _resolve(path);
    }
    //Identifica si la ruta existe
    if (existsSync(path)) {
      //Si la ruta es un archivo
      if (statSync(path).isFile()) {
        // ¿el archivo es un .md?
        if (path.slice(-3) === ".md") {
          //se agrega a un arreglo de archivos
          let files = [];
          files.push(path);
          calculate(files, resolve, reject, options);
        } else {
          reject("No es un archivo .md");
        }
      } else {
        // filtrar todos los archivos .md
        let files = [];
        const leerCarpeta = (ruta) => {
          //Lee la carpeta
          const archivosYCarpetas = readdirSync(ruta);
          //Recorre las carpetas y archivos
          for (const archivoOCarpeta of archivosYCarpetas) {
            //Si es un archivo .md se agrega al arreglo de archivos
            if (archivoOCarpeta.slice(-3) === ".md") {
              files.push(ruta + "/" + archivoOCarpeta);
            } else {
              //Si es una carpeta
              if (statSync(ruta + "/" + archivoOCarpeta).isDirectory()) {
                //se lee el contenido de la carpeta
                leerCarpeta(ruta + "/" + archivoOCarpeta);
              }
            }
          }
        };

        //Se llama a la función leerCarpeta
        leerCarpeta(path);

        //¿Existen archivos .md?
        if (files.length === 0) {
          reject("No hay archivos .md");
        }
        //Si existen archivos .md se agregan al arreglo de archivos(línea 49)
        calculate(files, resolve, reject, options);
      }
    } else {
      //Si no existe la ruta se rechaza la promesa
      reject("La ruta no existe");
    }
  });
};
module.exports = mdLinks;
