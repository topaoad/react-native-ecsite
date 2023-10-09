import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
/* screens */
import { HomeScreen } from "../screens/homeScreen"
import { ShopScreen } from "../screens/shopScreen"
import { RootStackParamList } from "@/types/navigation"
import { CreateReviewScreen } from "../screens/createReviewScreen"

const Stack = createStackNavigator<RootStackParamList>()
const RootStack = createStackNavigator<RootStackParamList>()

const MainStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: "#000",
    }}
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Shop" component={ShopScreen} />
  </Stack.Navigator>
)


export const HomeStackNavigator = () => (
  // <Stack.Navigator
  //   screenOptions={{
  //     headerTintColor: "#000",
  //   }}
  // >
  //
  //   <Stack.Screen
  //     name="Home"
  //     component={HomeScreen}
  //     options={{ headerShown: false }}
  //   />
  //   <Stack.Screen name="Shop" component={ShopScreen} />
  // </Stack.Navigator>
  <RootStack.Navigator mode='modal'>
    {/* 一番上のコンポーネントが初めに表示される */}
    <RootStack.Screen
      name="Main"
      component={MainStack}
      options={{ headerShown: false }}
    />
    <RootStack.Screen name="CreateReview" component={CreateReviewScreen} />
  </RootStack.Navigator>
)
