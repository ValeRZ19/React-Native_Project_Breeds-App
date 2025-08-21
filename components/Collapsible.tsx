import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { AnimatedSection, useCollapsible } from "reanimated-collapsible-helpers";
import FontAwesome from "@expo/vector-icons/FontAwesome6";

interface CollapsibleProps {
  title: string;
  text: string;
  images?: boolean;
}

const Collapsible = ({ title, text, images=false }: CollapsibleProps) => {

  const { animatedHeight, onPress, onLayout, state } = useCollapsible();
  // 'animatedHeight' is the animated value for height
  // 'onPress' is the function to toggle the collapsible state
  // 'onLayout' is used to measure the content's height
  // 'state' enum that indicates if the section is 'expanded' or 'collapsed'

  return (
    <View className="overflow-hidden bg-white shadow-lg shadow-gray-400 ">
      <Pressable onPress={onPress} className="p-2.5 active:opacity-07">
        <View className="flex-row items-center justify-between p-4">
          <Text className="text-xl font-fredoka-bold ">{title}</Text>
          <FontAwesome
            name={state === "expanded" ? "chevron-up" : "chevron-down"}
            size={20}
            color="black"
          />
        </View>
      </Pressable>
      <AnimatedSection
        animatedHeight={animatedHeight}
        onLayout={onLayout}
        state={state}
      >
        <View className="p-4 border-t border-gray-300">
          <Text className="text-lg font-fredoka-regular">{text}</Text>
          {
            images && (
              <View className="flex-row justify-between mt-4">
                <View className="flex-1 mr-2 items-center">
                  <Text className="text-lg font-fredoka-semibold mb-2">Easy Mode</Text>
                  <Image
                    source={require('../assets/images/Easy_mode.jpeg')}
                    className="w-full h-48 rounded-xl"
                    resizeMode="contain"
                  />
                </View>
                <View className="flex-1 ml-2 items-center">
                  <Text className="text-lg font-fredoka-semibold mb-2">Hard Mode</Text>
                  <Image
                    source={require('../assets/images/Hard_mode.jpeg')}
                    className="w-full h-48 rounded-xl"
                    resizeMode="contain"
                  />
                </View>
              </View>
            )
          }
        </View>
      </AnimatedSection>
    </View>
  );
};

export default Collapsible;
