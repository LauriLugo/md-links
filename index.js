const fs = require("fs");
//Obtiene la ruta y las opciones
const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    //Si la ruta/path está vacía mostrar error
    if (path === "") {
      reject("La ruta está vacía");
    }
    //Chequear o convertir a una ruta absoluta
    //Si la ruta es relativa convertirla a absoluta
    if (path[0] !== "/") {
      path = path.resolve(path);
    }
    //Identifica si la ruta existe
    if (fs.existsSync(path)) {
      //Si la ruta es un archivo
      if (fs.statSync(path).isFile()) {
        // ¿el archivo es un .md?
        if (path.slice(-3) === ".md") {
          //se agrega a un arreglo de archivos
          let files = [];
          files.push(path);
          calculate(files, resolve, reject, options);
        }
        else {
          reject("No es un archivo .md");
        }

      } else {
        // filtrar todos los archivos .md
        let files = [];
        const readDir = (path) => {
          //Lee el directorio
          const filesAndDirs = fs.readdirSync(path);
          //Recorre el directorio
          filesAndDirs.forEach((fileOrDir) => {
            //Si es un archivo .md se agrega al arreglo de archivos
            if (fileOrDir.slice(-3) === ".md") {
              files.push(path + "/" + fileOrDir);
            } else {
              //Si es un directorio se vuelve a llamar la función
              readDir(path + "/" + fileOrDir);
            }
          }
          );
        }
        //¿Existen archivos .md?
        if (files.length === 0) {
          reject("No hay archivos .md");
        }
        //Si existen archivos .md se agregan al arreglo de archivos(línea 30)
        calculate(files, resolve, reject, options);
      }
    } else {
      //Si no existe la ruta se rechaza la promesa
      reject("La ruta no existe");
    }
  });
};

module.exports = {
  mdLinks,
};
