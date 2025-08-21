import { View, Text, ActivityIndicator, Image } from 'react-native'
import React, { useMemo } from 'react'
import useBreed from '@/hooks/useBreed'
import { FlatList } from 'react-native-gesture-handler';
import BreedCard from '@/components/Card';
import { colors } from '@/constants/Colors';
import { useSearchContext } from '@/context/SearchContext';

const BreedList = () => {
  //Hooks
  const { breedsQuery } = useBreed();
  const { searchBreed } = useSearchContext(); 

  const filterBreeds = useMemo(() => {
    const breeds = breedsQuery.data || [];
    if(searchBreed) return breeds.filter(b=>b.name.toLowerCase().trim().includes(searchBreed.toLowerCase().trim()))
    else return breeds;

  }, [breedsQuery.data, searchBreed]);
    
  if (breedsQuery.isLoading) {
    return (
      <View className='flex-1 flex-col items-center justify-center'>
        <ActivityIndicator color={colors.primary} size="large" />
        <Text className='mt-2 text-lg text-gray-500 font-fredoka-regular'>Loading breeds...</Text>
      </View>
    );
  }
    
  if (breedsQuery.isError) {
    return (
      <View className='flex-1 items-center justify-center p-4'>
        <Text className='mt-2 text-lg text-red-950 font-fredoka-regular'>{(breedsQuery.error as Error).message}</Text>
      </View>
    );
  }
    
  if ((!breedsQuery.data || breedsQuery.data.length === 0) || filterBreeds.length === 0) {
    return (
        <View className='flex-1 items-center justify-center'>
          <Image
            source={require('../../../../assets/images/data_not_found.png')}
            className="w-full max-w-sm h-72"
            resizeMode="contain"
          />
          <Text className='text-lg px-32 text-center text-gray-500 font-fredoka-regular'>No data found. Please try again later</Text>
        </View>
    );
  }
    
  return (
      <View className='mt-5'>
        <FlatList
          data={filterBreeds}
          keyExtractor={(item) => (item.id.toString())}
          renderItem={({item})=>(
            <View >
              <BreedCard item={item} />
            </View>
          )}
      />
      </View>
  );
}

export default BreedList