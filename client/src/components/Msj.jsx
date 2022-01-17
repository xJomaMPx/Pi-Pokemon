import React from "react";

import styles from "./Msj.module.css";

const Msj = (props) => {
  return (
    <>
      {"msj" in props.pokemonFoundByName ? (
        <button className={styles.msj} onClick={(e) => props.clearByName(e)}>Cant find pokemon, click me for close this message</button>
      ) : null}
      {props.filteredPokemons.length === 0 && props.chosenTypes.length > 0 ? (<button className={styles.msj}>We cant find matches, but i cant still show you all Pokemons</button>):null}
    </>
  );
};
export default Msj;
