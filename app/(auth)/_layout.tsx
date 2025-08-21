import React from 'react'
import { Stack } from 'expo-router';
import { colors } from '@/constants/Colors';

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.secondary,
        },
        headerBackVisible:true
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          headerShown:false
        }}
      />

       <Stack.Screen
        name="aboutApp"
        options={{
          title:"About",
          
        }}
      />
    </Stack>
  )
}

export default AuthLayout