import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountDown: () => void;
  resetCountDown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);


export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsAcive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsAcive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  function startCountDown() {
    setIsAcive(true);
  }
  function resetCountDown() {
    clearTimeout(countdownTimeout);
    setIsAcive(false);
    setHasFinished(false);
    setTime(0.1 * 60);
  }

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountDown,
        resetCountDown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
