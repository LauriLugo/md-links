function calculate(arreglo, resolve, reject, options) {
  //para cada elemento del arreglo (archivo) obtener los links y guardarlos en un arreglo de objetos
  let links = [];
  arreglo.forEach((file) => {
    const data = fs.readFileSync(file, "utf-8");
    const renderer = new marked.Renderer();
    renderer.link = function (href, title, text) {
      links.push({
        href: href,
        text: text,
        file: file,
      });
    };
  }
  );
  //Si no hay links rechazar la promesa /¿Está vacío el arreglo de objetos?
  if (links.length === 0) {
    reject("No hay links");
  }
  //¿La opción validate es true?
  if (options.validate) {
    //Para cada link obtener el link y guardar el estatus
    links.forEach((link) => {
      link.status = fetch(link.href)
        .then((res) => {
          link.status = res.status;
          return res.status;
        })
        .catch((err) => {
          link.status = err.code;
          return err.code;
        });
    });
    //¿La opción Stats está presente?
    if (options.stats) {
      //Calcular total, unique y broken
      let total = links.length;
      let unique = [...new Set(links.map((link) => link.href))].length;
      let broken = links.filter((link) => link.status !== 200).length;
      //Devolver el total, unique y broken al usuario
      resolve({ total, unique, broken });
    } else {
      //Devolver el arreglo de objetos al usuario 
      resolve(links);
    }
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