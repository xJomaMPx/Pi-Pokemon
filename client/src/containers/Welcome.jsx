import { Link } from 'react-router-dom'

import styles from './Welcome.module.css'

export default function Welcome() {
  return (
    <div className={styles.welcomeContainer}>
      <h1 className={styles.welcomeText}>Welcome to Pokemon APP</h1>
      <button className={styles.button}><Link to={'home'}>Go catch them all!</Link></button>
    </div>
  );
}
