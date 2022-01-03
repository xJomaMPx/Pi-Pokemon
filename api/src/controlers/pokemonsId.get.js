const axios = require("axios");
const { Pokemon, Type } = require("../db");

const getById = async (req, res, next) => {
  
  const { id } = req.params;
  console.log(id)

  if (id.length === 36 && isNaN(id)) {
    const getByIdFromDb = await Pokemon.findByPk(id, { include: Type });

    if (getByIdFromDb !== null) {
      const resultByIdFromDb = {
        id: getByIdFromDb.id,
        name: getByIdFromDb.name,
        image: getByIdFromDb.image,
        health: getByIdFromDb.health,
        strength: getByIdFromDb.strength,
        defense: getByIdFromDb.defense,
        speed: getByIdFromDb.speed,
        height: getByIdFromDb.height,
        weight: getByIdFromDb.weight,
        types: getByIdFromDb.Types?.map((type) => type.name),
      };
      res.json(resultByIdFromDb).status(200);
    } else res.send({ msj: "not found on db" }).status(404);


  } else if (id.length < 36 && !isNaN(id)) {
    const getByIdFromApi = await axios(`https://pokeapi.co/api/v2/pokemon/${parseInt(id)}`);

    if (getByIdFromApi.status === 200) {
      let resultByNameFromApi = {
        id: getByIdFromApi.data.id,
        name: getByIdFromApi.data.name,
        image: getByIdFromApi.data.sprites.other.dream_world.front_default,
        health: getByIdFromApi.data.stats[0].base_stat,
        strength: getByIdFromApi.data.stats[1].base_stat,
        defense: getByIdFromApi.data.stats[2].base_stat,
        speed: getByIdFromApi.data.stats[5].base_stat,
        height: getByIdFromApi.data.height,
        weight: getByIdFromApi.data.weight,
        types: getByIdFromApi.data.types?.map((type) => type.type.name),
      };
      res.send(resultByNameFromApi).status(200);
    } else res.send({ msj: "not found on external api" }).status(404);

    
  } else res.send({ msj: "data recived incorrect" }).status(400);
  
};

module.exports = {
  getById,
};
