const { mdLinks } = require("./index.js");
mdLinks("/noexiste/")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
