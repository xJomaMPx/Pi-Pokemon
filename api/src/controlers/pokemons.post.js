const { Pokemon, Type } = require("../db");

const postPokemon = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length !== 9) {
      res.send({ msj: "insufficient information received" }).status(400);
    }
    
    else {
      const created = await Pokemon.create(req.body);
      await created.addType(req.body.types);
      res.send({ msj: "Pokemon created" }).status(201);
    }
  } catch (error) {
    res.send({ msj: "Already Exist" });
  }
};

module.exports = {
  postPokemon,
};
