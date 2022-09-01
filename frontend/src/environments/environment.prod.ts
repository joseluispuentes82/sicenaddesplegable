export const environment = {
  appName: 'Sicenad PROD',
  production: true,
  sizeMaxEscudo: 2, // MB
  sizeMaxDocRecurso: 10, // MB
  sizeMaxDocSolicitud: 10, // MB
  sizeMaxCartografia: 3, // GB
  tiposTiro:  ["Tiro directo", "Tiro indirecto", "Tiro antiaereo"],
  categoriaFicheroCartografia: "1", // es el id de la categoria de fichero "Cartografia", seria la primera en crearse al crear la app
  // endpoint para atacar en produccion (del servidor del cenad)
  hostSicenad: 'https://sicenadfinal.herokuapp.com/api/'
};
