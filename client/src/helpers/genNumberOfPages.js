
const getNumberOfPages = (pokemonsToShow, pokemonsPerPage) => Math.ceil((pokemonsToShow.length - 9) / pokemonsPerPage)

export {getNumberOfPages}