const getPokemonsToShow = (currentPage, pokemonsToShow, pokemonsPerPage) => {
    if (currentPage === 1) return pokemonsToShow.slice(0, 9);
    
    let indexOfFirstPokemon = (currentPage * pokemonsPerPage - pokemonsPerPage) - 3;
    let indexOfLastPokemon = (currentPage * pokemonsPerPage) - 3;
    
    if (currentPage !== 1) return pokemonsToShow.slice(indexOfFirstPokemon,indexOfLastPokemon);
}

export {getPokemonsToShow}