import { useEffect, useMemo, useState } from 'react'
import { useChallenges } from '../contexts/ChallengesContext';
import { useCountdown } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css'



export default function Countdown() {
  const {
    minutes, 
    seconds, 
    isActive, 
    hasFineshed, 
    startCountdown, 
    resetCountdown
  } = useCountdown()


  const countDownTime = useMemo(() => {
    const [minLeft, minRight] = String(minutes).padStart(2, '0').split('')
    const [secLeft, secRight] = String(seconds).padStart(2, '0').split('')

    return {minLeft, minRight, secLeft, secRight}
  }, [minutes, seconds])

  return (
    <div>

    <div className={styles.countdownContainer}>
      <div>
        <span>{countDownTime.minLeft}</span>
        <span>{countDownTime.minRight}</span>
      </div>
      <span>:</span>
      <div>
        <span>{countDownTime.secLeft}</span>
        <span>{countDownTime.secRight}</span>
      </div>
    </div>

    { hasFineshed ? (
      <button 
        disabled
        className={styles.countdownButton} 
      >
        Ciclo encerrado
      </button>
    ) : (
      <>
      { isActive ? (
        <button 
          type='button' 
          className={`${styles.countdownButton} ${styles.countdownActiveButton} `} 
          onClick={resetCountdown}
        >
          Abandonar o ciclo
        </button>
        ) : (
          <button 
            type='button' 
            className={styles.countdownButton} 
            onClick={startCountdown}
          >
            Iniciar um ciclo
          </button>
        ) 
      }
      </>
    ) }

    
    </div>
  )
}