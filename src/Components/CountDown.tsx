import { useState, useEffect, useContext } from "react";

import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/CountDown.module.css";

export function Countdown() {
  const {
    isActive,
    hasFinished,
    minutes,
    seconds,
    resetCountDown,
    startCountDown,
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [segondsLeft, segondsRight] = String(seconds)
    .padStart(2, "0")
    .split("");

  return (
    <div>
      <div className={styles.countDownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{segondsLeft}</span>
          <span>{segondsRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled type="button" className={styles.countDownButton}>
          Ciclo encerrado
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
              onClick={resetCountDown}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button
              type="button"
              className={styles.countDownButton}
              onClick={startCountDown}
            >
              Iniciar um ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
}
