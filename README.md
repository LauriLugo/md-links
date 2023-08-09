# Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Resumen del proyecto y Definición del producto](#2-resumen-del-proyecto-y-definición-del-producto)
  * [2.1. JavaScript API](#21-javascript-api)
  * [2.2. Interfaz de Línea de Comando - CLI](#22-interfaz-de-línea-de-comando---cli)
* [3. Requisitos](#3-requisitos)
* [4. Consideraciones generales](#4-consideraciones-generales)
* [5. Planificación](#5-planificación)

***
## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado que permite dar formato a textos de una manera sencilla y rápida, usando una serie de caracteres especiales _(almohadillas (#), asteriscos (*), guiones (-), corchetes ([ ]), paréntesis (()), etc.)_ para indicar los elementos que se quieren formatear, como encabezados, énfasis, listas, enlaces, imágenes, etc.

Fue creado en el año 2004 con el objetivo de facilitar la escritura de textos para la web sin tener que usar HTML. Markdown se puede convertir fácilmente a diferentes formatos y se puede usar en muchos sistemas de gestión de contenidos, blogs, foros y aplicaciones web. 

## 2. Resumen del proyecto y Definición del producto

Los archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de la información que se quiere compartir.

Para este proyecto se ha propuesto crear una herramienta de línea de comando (CLI) usando [Node.js](https://nodejs.org/), que lea y analice archivos en formato `Markdown` para verificar los links que contengan y reportar algunas estadísticas. Así mismo, se desarrolla una librería en JavaScript, esta librería consta de DOS partes:

## 2.1. JavaScript API

### ● Instalación

Abre una terminal o línea de comandos en tu sistema operativo y ejecuta el siguiente comando:
```
npm install @laurilugo/md-links
```
### ● Uso

La librería puede importarse en otros scripts de Node.js y ofrece la siguiente interfaz:

#### `mdLinks(path, options)`

##### Argumentos

* `path`: Ruta **absoluta** o **relativa** al **archivo** o **directorio**.
* `options`: Un objeto con las siguientes propiedades:
  - `validate`: Booleano que determina si se desea validar los links encontrados.
  - `stats`: Booleano que determina si se desean obtener estadísticas de los enlaces.
    
##### Valor de retorno

La función retorna una promesa (`Promise`) que resuelve un arreglo (`Array`) de objetos (`Object`), donde cada objeto representa un link y contiene
las siguientes propiedades

Con `validate:false` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.

Con `validate:true` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de respuesta HTTP.
* `ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.

#### Ejemplo (resultados como comentarios)

```js
const mdLinks = require("md-links");

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }, ...]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);
```

## 2.2. Interfaz de Línea de Comando - CLI

### ● Instalación

Abre una terminal o línea de comandos en tu sistema operativo y ejecuta el siguiente comando:
```
npm install @laurilugo/md-links -g
```
### ● Uso

El ejecutable puede ejecutarse de la siguiente manera a través de la **terminal**:

`md-links <path-to-file> [options]`

Por ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

El comportamiento por defecto no valida si las URLs responden ok o no, solo identifica el archivo markdown (a partir de la ruta que recibe como
argumento), analiza el archivo Markdown e imprime los links que vaya encontrando, junto con la ruta del archivo donde aparece y el texto que hay dentro del link.

#### Options

##### `--validate`

Si se incluye la opción `--validate`, el módulo hace una petición HTTP para averiguar si el link funciona o no. Si el link resulta en una redirección a una URL que responde ok, entonces se considera el link como ok.

Por ejemplo:

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

En este caso el _output_ incluye la palabra `ok` o `fail` después de la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

##### `--stats`

Si se incluye la opción `--stats` el output (salida) será un texto con estadísticas básicas sobre los links.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

También es posible combinar `--stats` y `--validate` para obtener estadísticas que necesiten de los resultados de la validación.

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```
## 3. Requisitos

* Node.js permite ejecutar JavaScript en el entorno del sistema operativo, nos abre las puertas para poder interactuar con el sistema en sí, archivos, redes, etc. Asegúrate de tenerlo instalado en tu computadora.
* Estas herramientas fueron desarrolladas para analizar archivos Markdown (.md). Asegúrate de tener uno o varios archivos Markdown en tu proyecto.

## 4. Consideraciones generales

* La **librería** y el **script ejecutable** (herramienta de línea de comando - CLI) están implementados en JavaScript para ser ejecutados con
  Node.js. 

* El módulo **es instalable** vía `npm install <laurilugo>/md-links`. Este módulo incluye tanto un _ejecutable_ que se pueda invocar en la línea de
  comando como una interfaz que se pueda importar con `require` para usarlo programáticamente.

* Para disminuir la complejidad del algoritmo recursivo, se utiliza la versión síncrona de la función para leer directorios, `readdirSync`.

## 5. Planificación
### ● Github Projects
Se implementaron _issues_ y _milestones_ para priorizar, organizar y hacer seguimiento del trabajo.

<p align="center">
  <img src="https://github.com/LauriLugo/md-links/assets/129604876/0eeeaea3-43af-49d3-9475-d317603831aa"
">
</p>

### ● Diagrama de flujo
Se elaboró un `diagrama de flujo`para visualizar y planificar las tareas y objetivos.

<p align="center">
  <img src="https://github.com/LauriLugo/md-links/assets/129604876/0b400260-cb95-426e-ab77-f716e643f238"
">
</p>

Realizado por :
```
Laura Lorena Lugo 🐱
```
