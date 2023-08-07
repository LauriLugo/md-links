#!/usr/bin/env node
const { program } = require("commander");
const mdLinks = require("./index.js");

// Definir las opciones de CLI
program
  .option("-v, --validate", "Validate the links")
  .option("-s, --stats", "Show statistics about the links")
  .parse(process.argv);

// Obtener la ruta de CLI
const path = program.args[0];
// Obtener las opciones de CLI
const options = program.opts();

// Llamar a la función mdLinks con la ruta y las opciones 
mdLinks(path, { validate: options.validate, stats: options.stats})
  .then((result) => {
    if (Array.isArray(result)) {
      if (options.validate) {
        for (const link of result) {
          console.log(
            `${link.file} ${link.href} ${link.ok} ${link.status} ${link.text}`
          );
        }
      } else {
        for (const link of result) {
          console.log(`${link.file} ${link.href} ${link.text}`);
        }
      }
    } else {
      for (const key of Object.keys(result)) {
        console.log(`${key}: ${result[key]}`);
      }
    }
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log("Gracias por usar md-links ❤️");
  });
