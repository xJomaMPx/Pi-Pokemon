import styles from "./SearchPokemon.module.css";

const SearchPokemon = ({ setUrlSearchByName, pokemonFoundByName }) => {
  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchInput}
        id="search-by-name"
        type="text"
        placeholder="Search Pokemon here"
      ></input>
      <button onClick={setUrlSearchByName} className={styles.searchButton}>Go!</button>
    </div>
  );
};

export default SearchPokemon;
