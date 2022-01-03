import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Pokemons from "../components/Pokemons";
import Paginate from "../components/Paginate";
import SearchPokemon from "../components/SearchPokemon";
import Msj from "../components/Msj";
import Filters from "../components/Filters";
import Loading from "../components/Loading";

import { pagesGenerator } from "../helpers/pagesGenerator";

import { getPokemonByName, filter, clearData } from "../actions/actions";

import store from '../store/store'



const Home = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(store.getState())

  const allPokemonsObtained = useSelector((state) => state.allPokemons);
  const pokemonFoundByName = useSelector((state) => state.pokemonByName);
  const filteredPokemons = useSelector((state) => state.filteredPokemons);
  const filteredTypes = useSelector((state) => state.filteredTypes);
  const chosenTypes = useSelector((state) => state.chosenTypes);
  const chosenOrigin = useSelector((state) => state.chosenOrigin);

  // PAGINADO
  //#######################################################################################

  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = currentPage === 1 ? 9 : 12;

  let pokemonsToShow =
    filteredPokemons.length !== 0 ? filteredPokemons : allPokemonsObtained;

  const getNumberOfPages = Math.ceil(pokemonsToShow.length / pokemonsPerPage);

  let pages = pagesGenerator(currentPage, getNumberOfPages);

  let indexOfFirstPokemon = currentPage * pokemonsPerPage - pokemonsPerPage;
  let indexOfLastPokemon = currentPage * pokemonsPerPage;

  if (currentPage !== 1) {
    indexOfFirstPokemon -= 3;
    indexOfLastPokemon -= 3;
  }

  pokemonsToShow = pokemonsToShow.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const setPage = (e, page) => {
    e.preventDefault();
    setCurrentPage(page);
  };

  // BUSQUEDA
  //#########################################################################################

  const setUrlSearchByName = (e) => {
    e.preventDefault();
    let value = document.getElementById("search-by-name").value.trim().toLowerCase();
    setSearchParams({ name: value });
  };

  useEffect(() => {
      const query = searchParams.get("name");
      if(query !== null) dispatch(getPokemonByName(`?name=${query}`));
  }, [dispatch,searchParams]);

  // FILTRADOS
  //#########################################################################################

  const filters = (e, filterOption) => {
    e.preventDefault();
    const target = e.target;
    if (filterOption === "filter-types") return dispatch(filter(filterOption, target.value));
    if (filterOption === "select-types") return dispatch(filter(filterOption, target.innerText));
    if (filterOption === "delete-types") return dispatch(filter(filterOption, target.innerText));
    if (filterOption === "select-origin") return dispatch(filter(filterOption, target.value));
  };

  useEffect(() => {
    if (chosenTypes.length >= 1) return dispatch(filter("filter-pokemons"));
    if (chosenTypes.length === 0) dispatch(filter("clean-filteredPokemons"));
  }, [dispatch, chosenTypes, chosenOrigin]);

  useEffect(() => {
    return () => {
      dispatch(clearData("clear-home"));
    };
  }, [dispatch,]);

  const clear = () => {
    setSearchParams({})
    dispatch(clearData("clear-pokemonByName"));
  };

  useEffect(() => {
    if('msj' in pokemonFoundByName) setSearchParams({})
  },[dispatch])

  return (
    <>
      <Navbar />

      <SearchPokemon
        setUrlSearchByName={setUrlSearchByName}
        pokemonFoundByName={pokemonFoundByName}
      />

      <Filters
        filteredTypes={filteredTypes}
        chosenTypes={chosenTypes}
        chosenOrign={chosenOrigin}
        filters={filters}
      />
      {"msj" in pokemonFoundByName ? (<Msj msj={"Cant find pokemon by Name"} />) : null}
      {filteredPokemons.length === 0 && chosenTypes.length > 0 ? (<Msj msj={"We cant find matches, but i cant still show you all Pokemons"}/>) : null}
      {Object.keys(pokemonFoundByName).length === 4 ? (
        <Pokemons pokemonFoundByName={pokemonFoundByName} clear={clear} />
      ) : Object.keys(pokemonFoundByName).length !== 4 && pokemonsToShow.length > 0 ? (
        <>
          <Pokemons pokemonsToShow={pokemonsToShow} />
          <Paginate pages={pages} setPage={setPage} currentPage={currentPage} />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Home;
