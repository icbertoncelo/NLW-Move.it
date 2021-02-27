import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { useChallenges } from './ChallengesContext'

interface CountdownData {
  minutes: number;
  seconds: number;
  isActive: boolean;
  hasFineshed: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode
}

const Countdown = createContext({} as CountdownData)

let countdownTimeout: NodeJS.Timeout;

function CountdownProvider({children}: CountdownProviderProps) {
  const { startNewChallenge } = useChallenges()

  const [time, setTime] = useState(0.05 * 60)
  const [isActive, setIsActive] = useState(false)
  const [hasFineshed, setHasFineshed] = useState(false)


  const minutes = Math.floor(time / 60)
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true)
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setHasFineshed(false)
    setTime(0.05 * 60)
  }

  useEffect(() => {
    if(isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000);
    } else if(isActive && time === 0) {
      setHasFineshed(true)
      setIsActive(false)
      startNewChallenge()
    }
  }, [isActive, time])

  return (
    <Countdown.Provider 
      value={{ 
        minutes, 
        seconds,
        isActive,
        hasFineshed,
        startCountdown,
        resetCountdown
      }}
    >
      {children}
    </Countdown.Provider> 
  )
}

function useCountdown(): CountdownData{
  const context = useContext(Countdown);

  return context;
}

export { CountdownProvider, useCountdown }