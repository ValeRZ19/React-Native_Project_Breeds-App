import { View, Text } from 'react-native'
import React from 'react'
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { useAuthContext } from '@/context/AuthContext'
import FontAwesome from '@expo/vector-icons/FontAwesome6'


const CustomDrawer = (props: DrawerContentComponentProps) => {
  const {user, logout} = useAuthContext()
  //console.log('UsER' + user?.userName)

  return (
    <DrawerContentScrollView 
      {...props}
      scrollEnabled={false}
       contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}
    >
      <View>
        <Text className='font-fredoka-regular text-2xl m-5'>Menu - {user?.userName}</Text>
        <View className='border-t border-gray-300'>
          <DrawerItemList {...props}/>
        </View>
      </View>
      <View className='border-t border-gray-300'>
        <DrawerItem
          label="Logout"
          onPress={()=> logout()}
          icon={({ color, size }) => (
            <FontAwesome name="right-from-bracket" size={size} color={color} />
          )}
        />
      </View>
    </DrawerContentScrollView>
  )
}

export default CustomDrawer