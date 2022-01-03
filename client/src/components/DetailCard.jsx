import styles from './DetailCard.module.css'

const DetailCard = (props) => {

  return (
    <div className={styles.fullContainer}>
      <div id={props.id} className={styles.detailCardContainer}>
        <h1 className={styles.detailCardName}>{props.name}</h1>
        <img className={styles.detailCardImage}src={props.image} alt={`Pokemon ${props.name}`}></img>
        <p className={styles.detailCardTitle}>Stats: </p>
        <p className={styles.detailCardData}>Health: <span>{props.health}</span></p>
        <p className={styles.detailCardData}>Strength: <span>{props.strength}</span></p>
        <p className={styles.detailCardData}>Defense: <span>{props.defense}</span></p>
        <p className={styles.detailCardData}>Speed: <span>{props.speed}</span></p>
        <p className={styles.detailCardData}>Height: <span>{props.height}</span></p>
        <p className={styles.detailCardData}>Weight: <span>{props.weight}</span></p>
        <h2 className={styles.detailCardTitle}>Types:</h2>
        {props.types?.map((type,i) => (<p className={styles.detailCardData} key={i}><strong>{type}</strong></p>))}
      </div>
    </div>
  );
};

export default DetailCard;
