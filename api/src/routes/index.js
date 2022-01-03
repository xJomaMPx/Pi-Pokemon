const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getPokemon } = require("../controlers/pokemons.get");
const { getTypes } = require("../controlers/types.get");
const { postPokemon } = require("../controlers/pokemons.post");
const { getById } = require("../controlers/pokemonsId.get");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.post("/pokemons", postPokemon);
router.get("/pokemons", getPokemon);
router.get("/pokemons/:id", getById);
router.get("/types", getTypes);

module.exports = router;
