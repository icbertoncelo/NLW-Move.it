import { useChallenges } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'

export default function Profile() {
  const { level } = useChallenges()

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/icbertoncelo.png" alt="Ian Carlos"/>

      <div>
        <strong>Ian Carlos</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level {level}
          </p>
      </div>
    </div>
  )
}