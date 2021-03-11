import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar(){

    const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);

    const percentToNexLegel = Math.round(currentExperience * 100) / experienceToNextLevel;

    return(
        <header className={styles.experienceBar}>
            <span>0px</span>
            <div>
                <div style={{width: `${percentToNexLegel}%` }} />
                <span className={styles.currentExperience} style={{left: `${percentToNexLegel}%`}}> 
                {currentExperience} xp 
                </span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    );
}