import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { APIResponseTheDogAPI } from '@/interfaces/api.interface';
import { usePortrait } from '@/hooks/usePortrait';

interface BreedCardProps {
  item: APIResponseTheDogAPI  ;
}

const BreedCard = ({item}: BreedCardProps) => {
  //Hooks
  const portraitMode = usePortrait();
  //States
  const [imageError, setImageError] = useState<boolean>(false);
  //It is use to get the image of the dog using it´s unique ID
  const imageUrl = `https://cdn2.thedogapi.com/images/${item.reference_image_id}.jpg`;
  
  return (
     <View className={portraitMode
      ?"flex-row items-center bg-white rounded-lg my-2 mx-4 p-4 shadow-md shadow-gray-300"
      :"flex-row items-center bg-white rounded-lg my-2 mx-24 p-4 shadow-md shadow-gray-300"}>
      <View className="w-36 h-36 bg-gray-200 rounded-md mr-4 justify-center items-center">
        {imageUrl && !imageError ? (
            <Image 
                source={{ uri: imageUrl }} 
                className="w-full h-full rounded-lg"
                resizeMode="cover"
                onError={()=> setImageError(true)}
            />
        ) : (
            <View className='flex w-36 h-36 items-center justify-center'>
              <Text className="text-gray-700">No Image</Text>
            </View>
        )}
      </View>
      <View className="flex-1">
        <Text className="text-xl font-semibold">{item.name}</Text>
        <Text className="text-base text-gray-600 mt-1">Weight: {item.weight?.metric} kg</Text>
        <Text className="text-base text-gray-600 mt-1">Height: {item.height?.metric} cm</Text>
        <Text className="text-sm text-gray-500 mt-1">Temperament: {item.temperament}</Text>
      </View>
    </View>
  )
}

export default BreedCard