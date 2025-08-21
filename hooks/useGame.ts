import React, { useState } from 'react'
import useBreed from './useBreed';
import { APIResponseTheDogAPI } from '@/interfaces/api.interface';


const useGame = () => {
    //States
    const [breeds, setBreeds] = useState<APIResponseTheDogAPI[]>([]); //
    const [selectedBreed, setSelectedBreed] = useState<APIResponseTheDogAPI | null>(null);
    const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
    const [correctAnswers, setCorrectAnswers] = useState<number>(0);
    
    //hooks
    const { breedsQuery } = useBreed();
    
    //Methods
    //Resets the game
    const resetGame = () => {
        setCorrectAnswers(0);
        setIncorrectAnswers(0);
        getRandomBreed();
    };

    /**
     * Generates a random number
     * @param max 
     * @returns {number}
     */
    const randomBreed=(max:number)=>{
        return Math.floor(Math.random() * max);
    }

    /**
     * Selects 4 random dog breeds from the API list and choose one of 
     * them as the correct breed for the round
     */
    const getRandomBreed = () => {

        if (breedsQuery.data && breedsQuery.data.length > 0) {
            const randomBreeds: APIResponseTheDogAPI[] = [];
            let indexSelected:number = 0;
            
            //Loop 4 times to obtain 4 random breeds
            while (randomBreeds.length < 4){
                const randomIndex = randomBreed(breedsQuery.data.length);
                const selectedBreed = breedsQuery.data[randomIndex];
                
                if (!randomBreeds.find(b=>b.id ===selectedBreed.id)) {
                    randomBreeds.push(selectedBreed);
                }
            }
            setBreeds(randomBreeds);
            indexSelected = randomBreed(randomBreeds.length);
            setSelectedBreed(randomBreeds[indexSelected]);
            console.log("Selected Breed:", randomBreeds[indexSelected].name); 
        }
    }

    /**
     * Verifies if the user's answer in easy mode is correct
     * @param breedId 
     * @returns {boolean}
     */
    const verifyAnswerEasyMode = (breedId:number):boolean =>{
        if(selectedBreed) {
            const isCorrect = breedId === selectedBreed.id;
            if(isCorrect) {
                setCorrectAnswers(prev => prev + 1);     
            }
            else {
                setIncorrectAnswers(prev => prev + 1);
            }
            return isCorrect;        
        }
        return false;
    }

    /**
     * Verifies if the user's answer in hard mode is correct
     * Compares breed names regardless of case, uppercase, lowercase, or leading/trailing spaces
     * @param breedName 
     * @returns {boolean}
     */
    const verifyAnswerHardMode = (breedName:string):boolean=>{
        if(selectedBreed){
            const isCorrect = breedName.toLowerCase().trim() === selectedBreed.name.toLowerCase().trim();
            if(isCorrect) {
                setCorrectAnswers(prev => prev + 1); 
            }
            else {
                setIncorrectAnswers(prev => prev + 1); 
            }
            return isCorrect;
        }
        return false;
    }


    return ({
        //Properties
        breeds,
        selectedBreed,
        correctAnswers,
        incorrectAnswers,

        //Methods
        getRandomBreed,
        resetGame,
        verifyAnswerEasyMode,
        verifyAnswerHardMode
    })
}

export default useGame
