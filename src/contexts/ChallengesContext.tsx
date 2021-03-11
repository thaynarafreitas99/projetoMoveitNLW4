import {createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

// ReactNode aceita qualquer modo;

interface ChallengesContextData{
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLevel:number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallgenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps{
    children: ReactNode;
    level: number; 
    currentExperience:number;
    challengesCompleted: number;
}


export const ChallengesContext = createContext ({ } as ChallengesContextData);


export function ChallengesProvider({ 
    children, 
    ...rest
} : ChallengesProviderProps){

    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    // Quando o segundo parametro é vazio, ele execulta 1 vez quando o component é exibido em tela
    useEffect(() => {
        Notification.requestPermission();
        },
        []
    )

    // Salvar os dados
    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted]);

    function levelUp(){
      setLevel(level + 1);
      setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random () * challenges.length)
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge)

        new Audio('./public_notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification ('Novo desafo 🤘', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallgenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if (!activeChallenge){
            return;
        }
        const { amount } = activeChallenge;
        // let it change quer dizer => deixa isso mudar, pode receber um novo valor no futuro.
        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);

    }

    
    return (
        <ChallengesContext.Provider value={{ 
            level, 
            currentExperience, 
            challengesCompleted, 
            experienceToNextLevel,
            levelUp,
            startNewChallenge,
            activeChallenge,
            resetChallgenge,
            completeChallenge,
            closeLevelUpModal
        }}>
        {children}

        {/* 2 && é um IF sem o ELSE */}
        { isLevelUpModalOpen && <LevelUpModal />}

        </ChallengesContext.Provider>
    )
}