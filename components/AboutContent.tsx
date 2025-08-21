import React from 'react'
import { usePortrait } from '@/hooks/usePortrait';
import { ScrollView } from 'react-native-gesture-handler';
import Collapsible from './Collapsible';

const AboutContent = () => {
  const portaitMode = usePortrait();

  return (
    <ScrollView className={portaitMode? 'm-10 mx-auto w-5/6 ': 'm-10 mx-auto w-4/5 '}>    
      <Collapsible 
        title='What is the app about' 
        text='This app is designed to helps you learn and recognize different dog breeds by showing you their pictures and names. You can test your knowledge in two fun game modes! '
      />
      <Collapsible 
        title='Game Modes' 
        text='There are two game modes to test your knowledge: Easy Mode, where you select the correct breed from multiple options, and Hard Mode, where you have to type the name of the breed from memory. Try to get as many correct answers as possible!'
        images={true}
      />
       
    </ScrollView>
  )
}

export default AboutContent