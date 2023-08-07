const mdLinks = require("../index.js");

describe("mdLinks", () => {
  it("RUTA ERRONEA: Debe rechazar cuando el path no existe", () => {
    return mdLinks("/noexiste/").catch((error) => {
      expect(error).toBe("La ruta no existe");
    });
  });

  it("ARCHIVO: Debe devolver un array de un objeto", () => {
    return mdLinks("unlink.md").then((result) => {
      expect(result.length == 1).toBe(true);
    });
  });

  it("ARCHIVO (validate): Debe devolver un array con validaciones y el primero da status 200", () => {
    return mdLinks("unlink.md",{validate:true}).then((result) => {
      expect(result[0]["status"] == 200).toBe(true);
    });
  });

  it("ARCHIVO (validate y stats): Debe devolver un objeto", () => {
    return mdLinks("unlink.md",{validate:true, stats:true}).then((result) => {
      expect(Array.isArray(result)).toBe(false);
    });
  });

  it("CARPETA: Debe ser un array con más de un objeto de respuesta", () => {
    return mdLinks("./").then((result) => {
      expect(result.length > 1).toBe(true);
    });
  });

  it("CARPETA (stats): Debe ser un objeto de respuesta", () => {
    return mdLinks("./",{stats:true}).then((result) => {
      expect(Array.isArray(result)).toBe(false);
    });
  });
});
