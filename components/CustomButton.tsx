import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { colors } from '../constants/Colors';

interface ButtomProps{
    label:string;
    isSkip?:boolean;
    onPress?:()=>void;
    status?: 'default' | 'correct' | 'incorrect';
}

const CustomButton = ({ label, isSkip=false, onPress, status='default' }:ButtomProps) => {
  
    let bgColor = colors.primary;
    if(status === 'correct') bgColor = colors.correctAnswer;
    else if(status === 'incorrect') bgColor = colors.incorrectAnswer;
   return (
     <View>
       <Pressable
            className='rounded-lg py-3 px-4 mt-3 shadow-sm  w-auto'
            style={{
                backgroundColor: isSkip ? colors.contrast_background : bgColor,
                borderColor: isSkip ? colors.primary: bgColor,
                borderWidth:1
            }}
        onPress={onPress}
        >
            <Text 
                className='text-center text-lg font-semibold' 
                style={{color:isSkip? colors.primary : colors.white}}
            >
                {label}
            </Text>
        </Pressable>
    </View>
  )
}

export default CustomButton