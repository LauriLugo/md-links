const fs = require("fs");
const axios = require("axios");

function calculate(arreglo, resolve, reject, options) {
  //para cada elemento del arreglo (archivo) obtener los links y guardarlos en un arreglo de objetos
  let links = [];
  for (const file of arreglo) {
    //Leer el archivo
    let data = fs.readFileSync(file, "utf8");
    //Obtener los links con regex y guardarlos en un arreglo
    let linksArray = data.match(/\[(.*)\]\((http[s]?:\/\/[^\)]*)\)/g);
    //Si hay links, guardarlos en el arreglo de objetos
    if (linksArray !== null) {
      for (const link of linksArray) {
        let linkParts = link.match(/\[(.*)\]\((http[s]?:\/\/[^\)]*)\)/);
        links.push({
          href: linkParts[2],
          text: linkParts[1],
          file: file,
        });
      };
    }
  }
  //Si no hay links se rechaza la promesa/¿Está vacío el arreglo de objetos?
  if (links.length === 0) {
    reject("No hay links");
  }
  //¿La opción validate es true?
  if (options.validate) {
    //Para cada link obtener el link y guardar el estatus
    const promises = [];
    for (const link of links) {
      promises.push(
        axios.get(link.href)
          .then((resultado) => {
            link.status = resultado.status;
            link.ok = 'ok';
            return resultado.status;
          })
          .catch((error) => {
            link.status = error.code;
            link.ok = 'fail';
            return error.code;
          })
      );
    }
    Promise.allSettled(promises)
      .then(() => {
        //¿La opción Stats está presente?
        if (options.stats) {
          //Calcular total, unique y broken
          let total = links.length;
          let unique = [...new Set(links.map((link) => link.href))].length;
          let broken = links.filter((link) => link.status !== 200).length;
          //Devolver el total, unique y broken al usuario
          return resolve({ total, unique, broken });
        } else {
          //Devolver el arreglo de objetos al usuario (links)
          return resolve(links);
        }
      })
      .catch((err) => {
        reject(err);
      });
  } else {
    //¿la opción Stats está presente?
    if (options.stats) {
      //Calcular total y unique
      let total = links.length;
      let unique = [...new Set(links.map((link) => link.href))].length;
      //Devolver el total y unique al usuario
      resolve({ total, unique });
    } else {
      //Devolver el arreglo de objetos al usuario 
      resolve(links);
    }
  }
}

module.exports = calculate;
