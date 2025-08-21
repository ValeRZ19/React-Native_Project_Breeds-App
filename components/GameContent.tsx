import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import useGame from "@/hooks/useGame";
import { usePortrait } from "@/hooks/usePortrait";
import CustomButton from "@/components/CustomButton";
import ThemedTextInput from "./ThemedTextInput";

interface GameContentProps {
  isEasyMode: boolean;
}

const GameContent = ({ isEasyMode }: GameContentProps) => {
  //Hooks
  const { breeds, selectedBreed, getRandomBreed, correctAnswers, incorrectAnswers, verifyAnswerEasyMode, verifyAnswerHardMode, resetGame } = useGame();
  const portraitMode = usePortrait();

  //Effects
  useEffect(() => {
    getRandomBreed();
  }, []);

  const imageUrl = selectedBreed
    ? `https://cdn2.thedogapi.com/images/${selectedBreed.reference_image_id}.jpg`
    : null;

  //States
  const [answerInput, setAnswerInput] = useState<string>("");
  const [answerId, setAnswerId] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  /**
   * Handles validation for the hard mode input
   * @returns {boolean}
   */
  const handleError = (): boolean => {
    if (answerInput.length === 0) {
      setError("Please enter a valid breed name");
      return true;
    }
    return false;
  };

  /**
   *  Handles the user's answer, validating and updating the game state.
   * @param answer 
   */
  const handlAnswer = (answer: number | string) => {
    setError("");

    if (isEasyMode) {
      verifyAnswerEasyMode(answer as number);
      setAnswerId(answer as number);
      setTimeout(() => {
        getRandomBreed();
        setAnswerId(null);
      }, 1000);
    } else {
      if (!handleError()) {
        const res = verifyAnswerHardMode(answer as string);
        setAnswerInput(answer as string);
        setIsCorrect(res);
        setTimeout(() => {
          getRandomBreed();
          setAnswerInput("");
          setIsCorrect(null);
        }, 1000);
      }
    }
  };

  return (
    <View
      className={
        portraitMode
          ? "flex-1 px-5 flex-col"
          : "flex-1 flex-row justify-center items-start"
      }
    >
      <View className={portraitMode ? "" : "w-72 pl-14 mt-10"}>
        <View
          className={
            portraitMode
              ? "flex-row justify-around items-center p-4 bg-score_bg mx-12 mt-8 mb-2 rounded-lg shadow-2xl shadow-shades"
              : "flex-row justify-around items-center p-4 bg-score_bg mt-8 mb-2 rounded-lg shadow-2xl shadow-shades"
          }
        >
          <View className="items-center">
            <Text className="text-lg font-bold">Correct</Text>
            <Text className="text-lg">{correctAnswers}</Text>
          </View>
          <View className="items-center">
            <Text className="text-lg font-bold">Incorrect</Text>
            <Text className="text-lg">{incorrectAnswers}</Text>
          </View>
        </View>

        <View className={portraitMode ? "px-14 mb-7" : "mb-7"}>
          <CustomButton label="Reset Game" isSkip={true} onPress={resetGame} />
        </View>
      </View>

      <View className={portraitMode ? "" : "flex-1 px-12 mt-5"}>
        {imageUrl && (
          <View
            className={portraitMode ? "items-center mb-6" : "items-center mb-4"}
          >
            <View className="w-64 h-64 rounded-2xl overflow-hidden border-2 border-gray-300 shadow-md shadow-gray-700 ">
              <Image
                source={{ uri: imageUrl }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
          </View>
        )}
        <Text className="text-center text-xl font-semibold mb-2">
          What breed is this dog?
        </Text>
      </View>
      {isEasyMode ? (
        <View className={portraitMode ? "px-10 mb-10" : "px-10 mt-10"}>
          {breeds.map((item) => (
            <CustomButton
              label={item.name}
              key={item.id}
              onPress={() => handlAnswer(item.id)}
              status={
                //Changes de color of the buttons based on the user's answer
                answerId !== null
                  ? item.id === selectedBreed?.id
                    ? "correct" // if correct, the color is green
                    : item.id === answerId
                      ? "incorrect" // if is incorrect, the color will be red
                      : "default" // default color
                  : "default"
              }
            />
          ))}
        </View>
      ) : (
        <View
          className={portraitMode ? "px-10 mb-10" : "px-30 w-[30%] mt-5 mr-10"}
        >
          <ThemedTextInput
            placeholder="Type your answer here..."
            value={answerInput}
            onChangeText={setAnswerInput}
            returnKeyLabel="done"
            returnKeyType="done"
            rightIcon={
              isCorrect !== null
                ? isCorrect
                  ? "circle-check"
                  : "circle-xmark"
                : undefined
            }
            isCorrectAnswer={isCorrect}
          />

          {error && <Text className="text-sm text-red-700 mb-2">{error}</Text>}
          <CustomButton
            label="Confirm"
            onPress={() => handlAnswer(answerInput)}
          />
          <CustomButton label="Skip" isSkip={true} onPress={getRandomBreed} />
        </View>
      )}
    </View>
  );
};

export default GameContent;
