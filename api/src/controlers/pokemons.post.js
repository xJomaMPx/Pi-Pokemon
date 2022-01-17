const { Pokemon, Type } = require("../db");

const postPokemon = async (req, res, next) => {

  const {name, health, strength, defense, speed, height, weight, image, types} = req.body
  try {
    let validation = null
    Object.keys(req.body).length === 9 ? validation = true : validation = false
    name && name.length && name.length <= 10 && !name.includes(' ') && /[AZ-az]/.test(name) ? validation = true : validation = false
    health && !isNaN(health) && health <= 100 && health >= 1? validation = true : validation = false
    strength && !isNaN(strength) && strength <= 100 && strength >= 1? validation = true : validation = false
    defense && !isNaN(defense) && defense <= 100 && defense >= 1? validation = true : validation = false
    speed && !isNaN(speed) && speed <= 100 && speed >= 1? validation = true : validation = false
    height && !isNaN(height) && height <= 100 && height >= 1? validation = true : validation = false
    weight && !isNaN(weight) && weight <= 1000 && weight >= 1? validation = true : validation = false
    typeof image === 'string' ? validation = true : validation = false
    Array.isArray(types) ? validation = true : validation = false

    if (!validation) {
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
