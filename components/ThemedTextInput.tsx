import { View, TextInputProps, TextInput, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome6';
import { colors } from '../constants/Colors';

interface Props extends TextInputProps{
  icon?:keyof typeof FontAwesome.glyphMap;
  rightIcon?: keyof typeof FontAwesome.glyphMap;
  onPress?:()=> void;
  isCorrectAnswer?: boolean | null; //it's used for the game
}

const ThemedTextInput = ({icon, rightIcon, onPress, isCorrectAnswer=null, ...rest }:Props) => {
  //States
  const [isActive, setIsActive] = useState(false);
  //Reference to the native TextInput component 
  const inputRef = useRef<TextInput>(null);

  //Dynamic border color 
  let borderColor;
  if(isCorrectAnswer === null) borderColor= colors.primary;
  else if(isCorrectAnswer) borderColor = colors.correctAnswer;
  else borderColor = colors.incorrectAnswer;

  return (
    <View 
        style={{ borderColor: isActive? borderColor: '#ccc'}}
        className='bg-contrast_background border rounded-md p-2 mb-1 flex-row items-center justify-between'
        onTouchStart={()=> inputRef.current?.focus()} //used to focus on the input, even if the corners are touch
    >
      {icon && (
          <FontAwesome 
              name={icon}
              size={24}
              className='ml-2 mr-2'
              color={colors.initial_icons}
          />
      )}
      <TextInput 
        ref={inputRef} //used to control focus 
        onFocus={()=> setIsActive(true)}
        onBlur={()=> setIsActive(false)}
        {...rest}
        className='flex-1 text-black'
      />

      {rightIcon && ( 
        <Pressable 
              onPress={onPress}
              className='mr-4'
          >
              <FontAwesome
                  name={rightIcon}
                  size={24}
                  color={ isCorrectAnswer === null ? 
                          colors.initial_icons 
                            : (isCorrectAnswer 
                              ? colors.correctAnswer 
                              : colors.incorrectAnswer)
                  } 
              />
          </Pressable>
      )}
    </View>
  )
}

export default ThemedTextInput

