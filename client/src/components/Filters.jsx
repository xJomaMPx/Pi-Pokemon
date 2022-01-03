import firstToUpper from "../helpers/firstToUpper";

import styles from "./Filters.module.css";

const Types = ({ filteredTypes, chosenTypes, chosenOrigin, filters }) => {
  return (
    <div className={styles.searchTypesContainer}>
      <input
        className={styles.searchTypesInput}
        name="types"
        type="text"
        placeholder="Search types"
        onChange={(e) => filters(e, 'filter-types')}
      ></input>

      <select className={styles.selectOrigin} name="origin" onChange={(e) => filters(e, "select-origin")}>
        <option value="both">Both</option>
        <option value="created">Created</option>
        <option value="existent">Existent</option>
      </select>

      <div className={styles.selectedTypesContainer}>
        {chosenTypes.map((type, i) => (
          <span className={styles.selectedType} key={i} onClick={(e) => filters(e, "delete-types")}>{firstToUpper(type)}</span>
        ))}
      </div>

      <div className={styles.filteredTypesContainer}>
        {filteredTypes.map((type, i) => (
          <p className={styles.filteredType} key={i} onClick={(e) => filters(e, "select-types")}>{firstToUpper(type.name)}</p>
        ))}
      </div>
    </div>
  );
};

export default Types;
