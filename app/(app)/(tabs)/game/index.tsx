import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'

const GameScreen = () => {
  return (
    <View className='flex-1 flex-col justify-center items-center p-4'>
      <Text className='text-center text-2xl font-semibold mb-8 m-2'>Select the game mode you want to play</Text>
      
      <View className='w-full max-w-sm'>
        <CustomButton label='Easy' onPress={()=> router.push('/game/easyMode')}/>
        <CustomButton label='Hard'onPress={()=> router.push('/game/hardMode')}/>
      </View>
    </View>
  )
}

export default GameScreen