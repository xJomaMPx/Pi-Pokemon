const axios = require("axios");
const { Type } = require("../db");

const getTypes = async (req, res, next) => {
  try {
    // busco todos los tipos en la base de datos segun su atributo name
    const getTypesFromDb = await Type.findAll();
    // si la longitud del arreglo es > 1 quiere decir q lo encontramos y lo enviamos
    if (getTypesFromDb.length > 1) res.send(getTypesFromDb).status(200);
    // si no...
    else {
      // buscamos en la api
      const getTypesFromApi = await axios("https://pokeapi.co/api/v2/type");
      // si la respuesta fue  distinta de 200 emitimos una respuesta al cliente con un estado y mensaje apropiedados
      if (getTypesFromApi.status !== 200) res.send({ msj: "error getting external data of types" }).status(404);
      // caso contrario que la respuesta de 200
      else {
        // mapeamos los resultados quedandonos la informacion necesaria
        const resultsToSaveInDb = getTypesFromApi.data.results.map((type) => ({ name: type.name }));
        // guardamos los resultados en nuestra db
        Type.bulkCreate(resultsToSaveInDb)
        // realizamos la busqueda de los datos de los tipos en la db
        const getTypesFromDb = await Type.findAll()
        // si la longitud es menor a 1 la busqueda salio mal y enviamos una respuesta apropiada al cliente
        if(getTypesFromDb.length < 1) return res.send({ msj: 'error saving data on db' }).status(400)
        // si la longitud del resultado es mayor a 1 quire decir que todo salio bien y enviamos al cliente la respuesta apropiada
        getTypesFromDb.length > 1 && res.send(getTypesFromDb).status(200); 
      }
    }
  } catch (error) {
    console.error(error)
    next({ status: 500, message: 'Internal Server Error' });
  }
};

module.exports = {
  getTypes,
};
