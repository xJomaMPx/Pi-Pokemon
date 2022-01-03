import axios from "axios";

import {
  GET_ALL_POKEMONS,
  GET_ALL_TYPES,
  GET_POKEMON_BY_NAME,
  GET_POKEMON_BY_ID,
  FILTER,
  POST_FORM,
  CLEAR_DATA,
} from "./actions_constants";

function getAllPokemons() {
  return function (dispatch) {
    axios.get("http://localhost:3001/pokemons")
      .then((res) => {
        dispatch({
          type: GET_ALL_POKEMONS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

function getAllTypes() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/types")
      .then((res) => {
        dispatch({
          type: GET_ALL_TYPES,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

function getPokemonByName(query) {
  return function (dispatch) {
    axios(`http://localhost:3001/pokemons${query}`)
      .then((res) => {
        dispatch({
          type: GET_POKEMON_BY_NAME,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_POKEMON_BY_NAME,
          payload: { msj: "Cant found pokemon by name" },
        });
      });
  };
}

function getPokemonById(id) {
  return function (dispatch) {
    axios(`http://localhost:3001/pokemons/${id}`)
      .then((res) => {
        dispatch({
          type: GET_POKEMON_BY_ID,
          payload: res.data,
        });
      })
      .catch((err) => console.error(err));
  };
}

function filter(info,values) {
  return {
    type: FILTER,
    info,
    payload: values,
  };
}

function postPokemon(values) {
  return {
    type: POST_FORM,
    payload: values,
  };
}

function clearData(info) {
  return {
    type: CLEAR_DATA,
    info,
  };
}

export {
  getAllPokemons,
  getAllTypes,
  getPokemonByName,
  getPokemonById,
  filter,
  postPokemon,
  clearData,
};
