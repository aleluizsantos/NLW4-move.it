
import { useState, useEffect } from "react";
import { isatty } from "tty";
import styles from "../styles/components/CountDown.module.css";

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsAcive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2,'0').split('');
    const [segondsLeft, segondsRight] = String(seconds).padStart(2,'0').split('');

    useEffect(()=>{
        if (isActive && time >0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000);
        } else if ( isActive && time === 0) {
            setHasFinished(true);
            setIsAcive(false);
        }
    },[isActive, time]);


    function startCountDown() {
        setIsAcive(true);
    }
    function resetCountDown() {
        clearTimeout(countdownTimeout);
        setIsAcive(false);
        setTime(0.1 * 60);
    }

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

            { hasFinished ? (
                <button 
                disabled
                type='button' 
                className={styles.countDownButton}>
                Ciclo encerrado
            </button>
            ) : (
                <>
                    {isActive 
                    ? (
                        <button 
                            type='button' 
                            className={`${styles.countDownButton} ${styles.countDownButtonActive}`} 
                            onClick={resetCountDown}>
                            Abandonar ciclo
                        </button>
                    
                    ) : (
                        <button 
                            type='button' 
                            className={styles.countDownButton} 
                            onClick={startCountDown}>
                            Iniciar um ciclo
                        </button>
                    )}
                </>
            )}


        </div>
    );
}