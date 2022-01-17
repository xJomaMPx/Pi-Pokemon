
import { useSelector } from "react-redux";
import { useForm } from "../hooks/useForm";

import Navbar from "../components/Navbar";

import styles from "./Form.module.css";

const initialForm = {
  name: "",
  health: null,
  strength: null,
  defense: null,
  speed: null,
  height: null,
  weight: null,
  types: [],
};

const Form = () => {
  const {
    inputs,
    errors,
    response,
    handleChange,
    handleClick,
    handleBlur,
    handleSubmit,
  } = useForm(initialForm);

  const typesObtained = useSelector((state) => state.allTypes);

  return (
    <>
      <Navbar />
      <form className={styles.formContainer} onSubmit={(e)=>handleSubmit(e)}>
      {response !== null ? <h2 className={response === 'Pokemon created'? styles.success : styles.failed}>{response}</h2>: null}
        <h1 className={styles.titleForm}>Build your own Pokemon</h1>
        <div className={styles.containerInput}>
          <label className={styles.labels} htmlFor="name">Name</label>
          <input
            className={styles.inputText}
            type="text"
            name="name"
            required
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
          <span className={styles.errors}>{errors["name"]}</span>

        <div className={styles.containerInput}>
          <label className={styles.labels} htmlFor="health">Health</label>
          <input
            type="number"
            name="health"
            max="100"
            min="1"
            required
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
          <span className={styles.errors}>{errors["health"]}</span>

        <div className={styles.containerInput}>
          <label className={styles.labels} htmlFor="strength">Strength</label>
          <input
            type="number"
            name="strength"
            max="100"
            min="1"
            required
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
          <span className={styles.errors}>{errors["strength"]}</span>

        <div className={styles.containerInput}>
          <label className={styles.labels} htmlFor="defense">Defense</label>
          <input
            type="number"
            name="defense"
            max="100"
            min="1"
            required
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
          <span className={styles.errors}>{errors["defense"]}</span>

        <div className={styles.containerInput}>
          <label className={styles.labels} htmlFor="speed">Speed</label>
          <input
            type="number"
            name="speed"
            max="100"
            min="1"
            required
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
          <span className={styles.errors}>{errors["speed"]}</span>

        <div className={styles.containerInput}>
          <label className={styles.labels} htmlFor="height">Height</label>
          <input
            type="number"
            name="height"
            max="100"
            min="1"
            required
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
          <span className={styles.errors}>{errors["height"]}</span>

        <div className={styles.containerInput}>
          <label className={styles.labels} htmlFor="weight">Weight</label>
          <input
            type="number"
            name="weight"
            max="1000"
            min="1"
            required
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
          <span className={styles.errors}>{errors["weight"]}</span>

        <p className={styles.selectTypes}>select types</p>
        <span className={styles.errors}>{errors['types']}</span>
        <div className={styles.formTypesContainer}>
          {typesObtained.map((e) => (
            <button
              className={inputs.types.includes(e.id) ? styles.active : styles.formTypes}
              key={e.id}
              type="button"
              value={e.id}
              name={e.name}
              onClick={handleClick}
              onBlur={handleBlur}
            >
              {e.name}
            </button>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <button type="reset" className={styles.button}>Reset</button>
        {Object.keys(errors).length === 0 &&
        inputs.name !== "" &&
        inputs.health !== null &&
        inputs.strength !== null &&
        inputs.defense !== null &&
        inputs.speed !== null &&
        inputs.height !== null &&
        inputs.weight !== null &&
        inputs.types.length > 0 ? (
          <button type="submit" className={styles.button}>Create</button>
        ) : null}
        
        </div>
      </form>
    </>
  );
};

export default Form;
