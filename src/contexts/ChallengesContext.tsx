import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

import challenges from '../../challenges.json'

interface Challenge {
  type: 'body' | 'eye';
  description: number;
  amount: number;
}

interface ChallengesContextData {
  level: number; 
  currentExperience: number; 
  challengesCompleted: number;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode
}

const ChallengesContext = createContext({} as ChallengesContextData)

function ChallengesProvider({children}: ChallengesProviderProps) {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)
  
  const [activeChallenge, setActiveChallenge] = useState(null)

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  const experienceToNextLevel = useMemo(() => {
    return Math.pow((level + 1) * 4, 2)
  }, [level])

  function levelUp() {
    setLevel(oldValue => oldValue + 1)
  }

  function playSound() {
    const audio  = new Audio('/notification.mp3')
    audio.play();
  }

  function addNotification(challenge){

    var options = {
      body: `Valendo ${challenge.amount}xp!`,
      silent: false,
      onShow: playSound()
  }

    return new Notification('Novo Desafio', options)
  }

  function startNewChallenge() {
    const activeChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[activeChallengeIndex]

    setActiveChallenge(challenge)


    if(Notification.permission === 'granted') {
      addNotification(challenge)
    }
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if(!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge

    let finalExperience = currentExperience + amount

    if(finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel
      levelUp()
    }

    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
  }

  return (
    <ChallengesContext.Provider 
      value={{ 
        level, 
        currentExperience, 
        challengesCompleted,
        activeChallenge,
        experienceToNextLevel,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge
      }}
    >
      {children}
    </ChallengesContext.Provider> 
  )
}

function useChallenges(): ChallengesContextData{
  const context = useContext(ChallengesContext);

  return context;
}

export { ChallengesProvider, useChallenges }