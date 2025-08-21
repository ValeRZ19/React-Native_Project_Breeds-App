import { View, Text, KeyboardAvoidingView, Platform, Image, ScrollView, Alert, Pressable} from "react-native";
import React, { useState } from "react";
import { Redirect, useRouter } from "expo-router";

import { usePortrait } from "@/hooks/usePortrait";
import { Controller, useForm } from "react-hook-form";

import { useAuthContext } from "@/context/AuthContext";
import ThemedTextInput from "@/components/ThemedTextInput";
import CustomButton from "@/components/CustomButton";
import FontAwesome  from "@expo/vector-icons/FontAwesome6";
import { colors } from "@/constants/Colors";

interface Inputs {
  userName: string;
  password: string;
}


const LoginScreen = () => {
  //Hooks
  const { login, user } = useAuthContext();
  const portraitMode = usePortrait(); //hook that helps verify if the screen is vertical or horizontal
  const router = useRouter();
  const { control, reset, handleSubmit, formState: { errors } } = useForm<Inputs>({
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  //States
  const [isVisible, setIsVisible] = useState<boolean>(false);

  //Methods
  const showPassword = () => {
    return isVisible === false ? setIsVisible(true) : setIsVisible(false);
  };

  const onSubmit = async (form: Inputs) => {
    const result = await login(form.userName, form.password);
    if (result) {
      //console.log("authenticated");
      router.replace("/breed");
      reset();
    } else {
      //console.log("Error");
      Alert.alert(
        "Login Error",
        "Invalid username or password. Please try again."
      );
    }
  };

  if (user) {
    console.log(user);
    return <Redirect href="/breed" />;
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className={portraitMode? 'flex-col w-full': 'flex-row h-full'}>
          <View className={ portraitMode 
              ? "bg-secondary items-center justify-center pt-24 pb-12 rounded-b-[35px] mb-7" 
              : "bg-secondary items-center justify-center p-20 rounded-r-[35px] "}>
            <Image
              source={require("../../assets/images/DogLogo.png")}
              className="w-28 h-28"
            />
            <Text className="text-4xl mt-3 font-fredoka-bold">Pawpedia</Text>
          </View>

          <View className={portraitMode? "px-8 w-full max-w-md self-center" : "px-8 w-full max-w-lg self-center ml-16"}>
            <Text className="text-primary text-3xl font-semibold">Login</Text>

            <View className="mt-6">
              <Text className="text-lg font-semibold mb-2">Username</Text>
              <Controller
                control={control}
                name="userName"
                rules={{ required: { value: true, message: "Username is required" } }}
                render={({ field: { onChange, value } }) => (
                  <ThemedTextInput
                    value={value}
                    onChangeText={(text) => onChange(text.trim())}
                    placeholder="Enter your username"
                    placeholderTextColor={colors.initial_icons}
                    autoCapitalize="none"
                    icon="user"
                    returnKeyLabel="done"
                    returnKeyType="done"
                  />
                )}
              />
              {errors.userName && (
                <Text className="text-base text-red-700 mb-4">
                  {errors.userName.message}
                </Text>
              )}

              <Text className="text-lg font-semibold mb-2 mt-3">Password</Text>
              <Controller
                control={control}
                name="password"
                rules={{ required: { value: true, message: "Password is required" } }}
                render={({ field: { onChange, value } }) => (
                  <ThemedTextInput
                    value={value}
                    onChangeText={(text) => onChange(text.trim())}
                    placeholder="Password"
                    placeholderTextColor={colors.initial_icons}
                    autoCapitalize="none"
                    secureTextEntry={!isVisible}
                    icon="lock"
                    rightIcon={isVisible ? "eye" : "eye-slash"}
                    onPress={showPassword}
                    returnKeyLabel="done"
                    returnKeyType="done"
                  />
                )}
              />
              {errors.password && (
                <Text className="text-base text-red-700 mb-2">
                  {errors.password.message}
                </Text>
              )}
            </View>

            <View className="mt-5">
              <CustomButton label="Sign in" onPress={handleSubmit(onSubmit)} />
            </View>

            <Pressable className={portraitMode ?"top-44  items-end": "top-2 left-24 items-end"} onPress={()=> router.push('/aboutApp')}>
              <FontAwesome name='circle-question' size={32} color='black'/>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
