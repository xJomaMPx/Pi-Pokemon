import React from 'react'
import { useSelector } from 'react-redux'

import styles from './Msj.module.css'

const Msj = (props) => {
    const pokemonFoundByName = useSelector((state) => state.pokemonByName)
    console.log(pokemonFoundByName)

    return (
        <div>
        {"clearByName" in props ? <button className={styles.msj} onClick={e=>props.clearByName(e)}>{props.msj}</button>: null}
        </div>
    )
}
export default Msj