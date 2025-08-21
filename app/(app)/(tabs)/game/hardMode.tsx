import React from 'react'
import GameContent from '@/components/GameContent';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAvoidingView, Platform } from 'react-native';

const HardMode = () => {

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={Platform.OS === 'ios'? 100: 0}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <GameContent isEasyMode={false} />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default HardMode