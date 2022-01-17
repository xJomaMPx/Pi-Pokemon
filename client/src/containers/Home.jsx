import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import Pokemons from "../components/Pokemons";
import Paginate from "../components/Paginate";
import SearchPokemon from "../components/SearchPokemon";
import Msj from "../components/Msj";
import Filters from "../components/Filters";
import Loading from "../components/Loading";

import { getNumberOfPages } from '../helpers/genNumberOfPages'
import { pagesGenerator } from "../helpers/pagesGenerator";
import { getPokemonsToShow } from '../helpers/getPokemonsToShow'
import { getPokemonByName, filter, clearData } from "../actions/actions";

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const allPokemonsObtained = useSelector((state) => state.allPokemons);
  const pokemonFoundByName = useSelector((state) => state.pokemonByName);
  const filteredPokemons = useSelector((state) => state.filteredPokemons);
  const filteredTypes = useSelector((state) => state.filteredTypes);
  const chosenTypes = useSelector((state) => state.chosenTypes);
  const chosenOrigin = useSelector((state) => state.chosenOrigin);

  // PAGINADO
  //#######################################################################################

  const [currentPage, setCurrentPage] = useState(1);


  const pokemonsPerPage = 12;

  let pokemonsToShow = filteredPokemons.length !== 0 ? filteredPokemons : allPokemonsObtained;

  let pages = pagesGenerator(currentPage, getNumberOfPages(pokemonsToShow, pokemonsPerPage));

  pokemonsToShow = getPokemonsToShow(currentPage, pokemonsToShow, pokemonsPerPage)

  const setPage = (e, page) => {
    e.preventDefault();
    setCurrentPage((prevState) => (prevState = page));
  };

  // BUSQUEDA POR NOMBRE
  //#########################################################################################

  const setUrlSearchByName = (e) => {
    e.preventDefault();
    if (Object.keys(pokemonFoundByName).length === 1 && location.search.includes("name")) {
      dispatch(clearData("clear-pokemonByName"));
    }
    let value = document.getElementById("search-by-name").value.trim().toLowerCase();
    setSearchParams({ name: value });
  };

  const clearByName = (e) => {
    setSearchParams({});
    dispatch(clearData("clear-pokemonByName"));
  };

  useEffect(() => {
    if (Object.keys(pokemonFoundByName).length === 0 && location.search.includes("name")) {
      const queryString = searchParams.get("name");
      dispatch(getPokemonByName(`?name=${queryString}`));
    }
  }, [dispatch, searchParams]);

  // FILTRADOS
  //#########################################################################################

  const filters = (e, filterOption) => {
    e.preventDefault();
    const target = e.target;
    if (filterOption === "filter-types") return dispatch(filter(filterOption, target.value));
    if (filterOption === "select-types") {
      e.preventDefault()
      setCurrentPage(currentPage => currentPage = 1)
      return dispatch(filter(filterOption, target.innerText));
    }
    if (filterOption === "delete-types") return dispatch(filter(filterOption, target.innerText));
    if (filterOption === "select-origin") return dispatch(filter(filterOption, target.value));
    if (filterOption === "filter-reset") return dispatch(filter(filterOption, ));
  };

  useEffect(() => {
    if (chosenTypes.length >= 1) dispatch(filter("filter-pokemons"));
    if (chosenTypes.length === 0) dispatch(clearData("clean-filteredPokemons"));
  }, [dispatch, chosenTypes, chosenOrigin]);


  // LIMPIAMOS EL HOME
  //#########################################################################################

  useEffect(() => {
    return () => dispatch(clearData("clear-home"));
  }, [dispatch]);

  //#########################################################################################
  return (
    <>
      {pokemonsToShow.length === 0 && Object.keys(pokemonFoundByName).length !== 4 ? <Loading/>: null}
      {pokemonsToShow.length > 0 && <Navbar />}
      
      {pokemonsToShow.length > 0 && 
      <SearchPokemon
        setUrlSearchByName={setUrlSearchByName}
        pokemonFoundByName={pokemonFoundByName}
      />}
      {pokemonsToShow.length > 0 && 
      <Filters
        filteredTypes={filteredTypes}
        chosenTypes={chosenTypes}
        chosenOrign={chosenOrigin}
        filters={filters}
      />}

      {pokemonsToShow.length > 0 ? 
      <Msj 
        pokemonFoundByName={pokemonFoundByName}
        clearByName={clearByName}
        filteredPokemons={filteredPokemons}
        chosenTypes={chosenTypes}

      /> : null}

      {Object.keys(pokemonFoundByName).length <= 1 && pokemonsToShow.length > 0 ? (
        <Pokemons 
        pokemonsToShow={pokemonsToShow} 
        />
      ): null}


      {Object.keys(pokemonFoundByName).length > 1 && pokemonsToShow.length > 0? (
        <Pokemons
          pokemonFoundByName={pokemonFoundByName}
          clearByName={clearByName}
        />
      ): null}

      {Object.keys(pokemonFoundByName).length <= 1 && pokemonsToShow.length > 0 ? (
        <Paginate pages={pages} setPage={setPage} currentPage={currentPage} />
      ) : null}


      

      {/* {"msj" in pokemonFoundByName ? (
        <Msj
          clearByName={clearByName}
          msj="Cant find pokemon, click me for close this message"
          pokemonFoundByName={pokemonFoundByName}
        />
      ) : null} */}

      {/* {filteredPokemons.length === 0 && chosenTypes.length > 0 ? (
        <Msj msj="We cant find matches, but i cant still show you all Pokemons" />
      ) : null}

      {Object.keys(pokemonFoundByName).length === 4 ? (
        <Pokemons
          pokemonFoundByName={pokemonFoundByName}
          clearByName={clearByName}
        />
      ) : null}

      {Object.keys(pokemonFoundByName).length <= 1 &&
      pokemonsToShow.length > 0 ? (
        <Pokemons pokemonsToShow={pokemonsToShow} />
      ) : null}

      {Object.keys(pokemonFoundByName).length !== 4 &&
      pokemonsToShow.length > 0 ? (
        <Paginate pages={pages} setPage={setPage} currentPage={currentPage} />
      ) : null} */}

      {/* {Object.keys(pokemonFoundByName).length === 0 &&
      pokemonsToShow.length === 0 ? (
        <Loading />
      ) : null} */}
    </>
  );
};

export default Home;
