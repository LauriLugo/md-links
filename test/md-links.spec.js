const { mdLinks } = require('../index.js');


describe('mdLinks', () => {

  // it('should...', () => {
  //   console.log('FIX ME!');
  // });



  it('Debe rechazar cuando el path no existe', () => {
    return mdLinks('/noexiste/')
      .catch((error) => {
        expect(error).toBe('La ruta no existe');
      });
  });
});
