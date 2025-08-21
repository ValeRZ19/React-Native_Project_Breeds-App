import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome6';
import { useSearchContext } from '@/context/SearchContext';
import { usePortrait } from '@/hooks/usePortrait';
import ThemedTextInput from './ThemedTextInput';
import { colors } from '@/constants/Colors';

interface CustomHeaderProps {
  label:string;
  searchInput?:boolean;
}

const CustomHeader = ({label, searchInput=false}:CustomHeaderProps) => {
  //Hook
  const { setSearchBreed } = useSearchContext();
  const portraitMode = usePortrait(); 
  const navigation = useNavigation();

  //function that dispatches the action to open the drawer
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View className='flex-col bg-secondary shadow-md shadow-slate-600 rounded-[32px] '>
     <View className="flex-row px-10 py-7 mt-3 items-center">
        <Pressable onPress={openDrawer} className='mr-5'>
          <FontAwesome name="bars" size={30} color="black"/>
        </Pressable>
        <View className='flex-row justify-center items-center px-12'>
          <Image
            source={require('../assets/images/DogLogo.png')}
            className="w-16 h-16"
            resizeMode='contain'
          />
          <Text className="text-3xl mt-3 font-fredoka-bold ml-2">{label}</Text>
        </View>
      </View>
      {
        searchInput && (
          <View className={portraitMode? 'px-14 mb-4 ':'px-36 mb-4 '}>
            <ThemedTextInput 
              placeholder='Search'
              placeholderTextColor={colors.initial_icons}
              rightIcon={'magnifying-glass'}
              onChangeText={setSearchBreed}
            />
          </View>
        )
      }

    </View>
  )
};

export default CustomHeader