import Pokemon from "./Pokemon";

import styles from "./Pokemons.module.css";

const Pokemons = (props) => {
  return (
    <>
      {"pokemonFoundByName" in props ? (
        <div className={styles.pokemonsContainer}>
          <Pokemon
            id={props.pokemonFoundByName.id}
            name={props.pokemonFoundByName.name}
            image={props.pokemonFoundByName.image}
            types={props.pokemonFoundByName.types}
          />
          <button onClick={props.clear}>See all again!</button>
        </div>
      ) : (
        <div className={styles.pokemonsContainer}>
          {props.pokemonsToShow?.map((pkm) => (
            <Pokemon
              key={pkm.id}
              id={pkm.id}
              name={pkm.name}
              image={pkm.image}
              types={pkm.types}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Pokemons;
