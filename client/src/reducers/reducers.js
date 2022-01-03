import {
  GET_ALL_POKEMONS,
  GET_ALL_TYPES,
  GET_POKEMON_BY_NAME,
  GET_POKEMON_BY_ID,
  FILTER,
  CLEAR_DATA,
} from "../actions/actions_constants";

const initialState = {
  allPokemons: [],
  allTypes: [],
  filteredTypes: [],
  chosenTypes: [],
  chosenOrigin: "both",
  filteredPokemons: [],
  pokemonByName: {},
  pokemonById: {},
  pokemonToPost: {},
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        allPokemons: action.payload,
      };

    ///////////////////////////////////////////////////////////////////////////////

    case GET_ALL_TYPES:
      return {
        ...state,
        allTypes: action.payload,
      };

    ///////////////////////////////////////////////////////////////////////////////

    case GET_POKEMON_BY_NAME:
      return {
        ...state,
        pokemonByName: action.payload,
      };

    ///////////////////////////////////////////////////////////////////////////////

    case GET_POKEMON_BY_ID:
      return {
        ...state,
        pokemonById: action.payload,
      };

    ///////////////////////////////////////////////////////////////////////////////

    case FILTER:
      if (action.info === "filter-types") {
        const payloadConvert = action.payload.toLowerCase().trim();
        if (action.payload.length >= 1) {
          return {
            ...state,
            filteredTypes: state.allTypes.filter((type) => type.name.startsWith(payloadConvert)
            ),
          };
        } else {
          return {
            ...state,
            filteredTypes: [],
          };
        }
      } else if (action.info === "select-types") {
        const payloadConvert = action.payload.toLowerCase().trim();
        if (!state.chosenTypes.includes(payloadConvert)) {
          return {
            ...state,
            chosenTypes: [...state.chosenTypes, payloadConvert],
          };
        } else {
          return {
            ...state,
          };
        }
      } else if (action.info === "delete-types") {
        const payloadConvert = action.payload.toLowerCase().trim();
        return {
          ...state,
          chosenTypes: state.chosenTypes.filter(
            (type) => type !== payloadConvert
          ),
        };
      } else if (action.info === "select-origin") {
        return {
          ...state,
          chosenOrigin: action.payload,
        };
      } else if (action.info === "filter-pokemons" && state.chosenOrigin === 'both') {
        return {
          ...state,
          filteredPokemons: state.allPokemons.filter((pkm) => {
            const pkmTypesOrder = pkm.types.sort();
            const chosenTypesOrder = state.chosenTypes.sort();
            if (pkmTypesOrder.toString().includes(chosenTypesOrder.toString())) return true;
            else return false;
          }),
        };
      } else if (action.info === 'filter-pokemons' && state.chosenOrigin === "created") {
        console.log(state.chosenOrigin)
        return {
          ...state,
          filteredPokemons: state.allPokemons.filter((pkm) => {
            const pkmTypesOrder = pkm.types.sort();
            const chosenTypesOrder = state.chosenTypes.sort();
            if (pkmTypesOrder.toString().includes(chosenTypesOrder.toString()) && isNaN(pkm.id)) return true;
            else return false;
          }),
        };
      } else if (action.info === 'filter-pokemons' && state.chosenOrigin === "existent") {
        return {
          ...state,
          filteredPokemons: state.allPokemons.filter((pkm) => {
            const pkmTypesOrder = pkm.types.sort();
            const chosenTypesOrder = state.chosenTypes.sort();
            if (pkmTypesOrder.toString().includes(chosenTypesOrder.toString()) && !isNaN(pkm.id)) return true;
            else return false;
          }),
        };
      } else if (action.info === 'clean-filteredPokemons') {
        return {
          ...state,
          filteredPokemons: []
        }
      } else {
        return {
          ...state
        }
      }

    ///////////////////////////////////////////////////////////////////////////////

    case CLEAR_DATA:
      if(action.info === 'clear-home') {
        return {
          ...state,
          pokemonByName: {},
          chosenTypes: [],
          filteredPokemons: []
        }
      }
      if(action.info === 'clear-detail') {
        return {
          ...state,
          pokemonById: {}
        }
      }
      if(action.info === 'clear-pokemonByName') {
        return {
          ...state,
          pokemonByName: {}
        }
      }
      
      return {
        ...state,
        pokemonByName: {},
      };
    ///////////////////////////////////////////////////////////////////////////////
    default:
      return {
        ...state,
      };
  }
}
