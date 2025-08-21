import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import FontAwesome from '@expo/vector-icons/FontAwesome6'
import { colors } from '@/constants/Colors';
import CustomDrawer from '@/components/CustomDrawer';
import CustomHeader from '@/components/CustomHeader';


const DrawerLayout = () => {
  return (
    <Drawer 
      drawerContent={CustomDrawer}
      screenOptions={{
          headerShown:true,
          drawerStatusBarAnimation:'slide',
          sceneStyle:{
            backgroundColor:colors.background
          },
          drawerActiveTintColor:colors.primary,
          headerShadowVisible:false,
          headerStyle:{
            backgroundColor: colors.secondary
          },
          header:(()=>{
            return(
              <CustomHeader label='About'/> 
            )
          })   
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel:'Home', title:'Pawpedia', 
          drawerIcon:({color, size})=>(<FontAwesome size={size} name='house' color={color}/>),
          headerShown:false,     
        }}
      />

      <Drawer.Screen 
        name='about/index' 
        options={{drawerLabel:'About', title:'About', 
          drawerIcon:({color, size})=>(<FontAwesome size={size} name='circle-question' color={color}/>),    
        }}
      />
    </Drawer>
  )
}

export default DrawerLayout