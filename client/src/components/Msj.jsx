import React from 'react'

import styles from './Msj.module.css'

const Msj = (props) => {
    return (
        <p className={styles.msj}>{props.msj}</p>
    )
}
export default Msj