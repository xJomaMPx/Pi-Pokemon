const axios = require("axios");
const { Pokemon, Type, Op } = require("../db");

const getPokemon = async (req, res, next) => {
  const { name } = req.query;
  console.log(name);

  if (name) {
    try {
      const getByNameFromDb = await Pokemon.findOne({
        where: {
          name: {
            [Op.iLike]: `${name}`,
          },
        },
        attributes: ["id", "name", "image"],
        include: Type,
      });


      if (getByNameFromDb !== null) {
        const resultByNameFromDb = {
          id: getByNameFromDb.id,
          name: getByNameFromDb.name,
          image: getByNameFromDb.image,
          types: getByNameFromDb.Types?.map((type) => type.name),
        };
        return res.send(resultByNameFromDb).status(200);
      }

      if (getByNameFromDb === null) {
        const getByNameFromApi = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (getByNameFromApi.status === 200) {
          const resultByNameFromApi = {
            id: getByNameFromApi.data.id,
            name: getByNameFromApi.data.name,
            image:getByNameFromApi.data.sprites.other.dream_world.front_default,
            types: getByNameFromApi.data.types?.map((type) => type.type.name),
          };
          return res.send(resultByNameFromApi).status(200);
        }
      }
    } catch (error) {
      next({ msj: "Cant found pokemon by name", status: 404 });
    }
  } else {
    let allUrls = [];
    async function getLinks(url) {
      try {
        if (allUrls.length === 40) return;
        if (allUrls.length < 40) {
          let getUrls = await axios(url);
          let next = getUrls.data.next;
          getUrls = getUrls.data.results.map((pkmUrl) => pkmUrl.url);
          allUrls = [...allUrls, ...getUrls];
          await getLinks(next);
        }
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await getLinks("https://pokeapi.co/api/v2/pokemon");
      if (allUrls.length !== 40) return res.send({ msj: "Error getting Links" }).status(404);

      let getData = allUrls.map((e) => axios(e));
      getData = await Promise.all(getData);
      let allPokemonsObteinedFromApi = getData.map((dataPkm) => {
        const Pokemon = {
          id: dataPkm.data.id,
          name: dataPkm.data.name,
          image: dataPkm.data.sprites.other.dream_world.front_default,
          types: dataPkm.data.types?.map((e) => e.type.name),
        };
        return Pokemon;
      });

      let allPokemonsObteinedFromDb = await Pokemon.findAll({
        attributes: ["id", "name", "image"],
        include: Type,
      });
      allPokemonsObteinedFromDb = allPokemonsObteinedFromDb.map((pkm) => {
        const Pokemon = {
          id: pkm.id,
          name: pkm.name,
          image: pkm.image,
          types: pkm.Types?.map((type) => type.name),
        };
        return Pokemon;
      });

      let allPokemons = [...allPokemonsObteinedFromApi,...allPokemonsObteinedFromDb,];

      res.send(allPokemons).status(200);
    } catch (error) {
      next({ status: 500, message: "Internal Server Error" });
    }
  }
};

module.exports = {
  getPokemon,
};
