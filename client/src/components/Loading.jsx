import React from 'react'
import loading from './styles/pokemon.gif'
import styles from './styles/Loading.css'

export default function Loading() {
    return (
        <div className={styles.bkg}>
                <img src={loading} alt="loading gif" className={styles.loadingif}/>
                <div className={styles.LetrasLoading}><h1>CARGANDO POKEMONS !..</h1></div>
        </div>
    )
}