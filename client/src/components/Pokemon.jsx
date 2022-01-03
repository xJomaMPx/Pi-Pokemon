import { Link } from "react-router-dom";

import styles from './Pokemon.module.css'

export default function Pokemon({ id, name, image, types }) {
  return (
    <Link to={`/detail/${id}`} className={styles.text}>
      <div className={styles.pokemonContainer}>
        <h3>{name}</h3>
        <img src={image} alt={`Pokemon ${name}`} className={styles.pokemonImage}></img>
        <ul className={styles.listTypes}>
          {types?.map((type, index) => (<li key={index} className={styles.types}>{type}</li>))}
        </ul>
      </div>
    </Link>
  );
}
