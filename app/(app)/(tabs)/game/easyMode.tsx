import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import GameContent from '@/components/GameContent';

const EasyMode = () => {
  return (
    <ScrollView className='flex-1 px-5'>
      <GameContent isEasyMode={true}/>
    </ScrollView>
  )
}

export default EasyMode;