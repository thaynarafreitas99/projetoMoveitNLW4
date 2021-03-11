
import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css'


export function Countdown(){

    const {
            minutes, 
            seconds, 
            hasFinished, 
            isActive, 
            startCountdown, 
            resetCountdown
        } = useContext(CountdownContext)
    // se eu tiver no minuto 25, ele retorna 25. (splite divide então ele pegaria e retornaria no array '2' e '5')
    // se tiver no minuto 5, não existe 2, somente 1, o pad start verifica se só tem 1 numero, ele preenche pra esquerda (start/inicio) com 0
    //como o splite retorna um array, pode se destruturar pegando cada lado com o [ ] na declaração da variável 
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

   

    return(
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            
            {hasFinished ? (
                  <button 
                  disabled
                  type="button" 
                  className={styles.countdownButton}>
                  Ciclo encerrado
                  </button>
            ) : 
            (
                <>
                    {isActive ? 
                        (
                            <button 
                            type="button" 
                            className={ `${styles.countdownButton} ${styles.countdownButtonActive}`}
                            onClick={resetCountdown}>
                            Abandonar ciclo
                            </button>
                        )
                        :
                        (
                            <button 
                                type="button" 
                                className={styles.countdownButton}
                                onClick={startCountdown}>
                                Iniciar um ciclo
                            </button>
                        )
                    }
                </>

            )
            
            }


         
        </div>
    );
}