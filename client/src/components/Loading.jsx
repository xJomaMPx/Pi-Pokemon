import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles["L-letter"]}>L</div>
      <div className={styles["O-letter"]}>o</div>
      <div className={styles["A-letter"]}>a</div>
      <div className={styles["D-letter"]}>d</div>
      <div className={styles["I-letter"]}>i</div>
      <div className={styles["N-letter"]}>n</div>
      <div className={styles["G-letter"]}>g</div>
      <div className={styles["first-point"]}>.</div>
      <div className={styles["second-point"]}>.</div>
      <div className={styles["thrid-point"]}>.</div>
    </div>
  );
};
export default Loading;
