const fs = require("fs");

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    //Si la ruta/path está vacía mostrar error
    //Chequear o convertir a una ruta absoluta
    //Identifica si la ruta existe
    if (fs.existsSync(path)) {
      //Probar si esa ruta absoluta es un archivo o un directorio
      //Si es un directorio filtrar los archivos md
      //Si no hay archivos md rechazar la promesa
      //Si hay archivos md leerlos
      //Si no hay links rechazar la promesa
      //Si hay links guardarlos en un array de objetos
      //Si no hay opciones resolver la promesa con el array de objetos
      //Si hay opciones comprobar los enlaces y guardarlos en un array de objetos y resolver la promesa con el array de objetos
    } else {
      //Si no existe la ruta se rechaza la promesa
      reject("La ruta no existe");
    }
  });
};

module.exports = {
  mdLinks,
};
