import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
/* screens */
import { HomeScreen } from "../screens/homeScreen"
import { ShopScreen } from "../screens/shopScreen"

const Stack = createStackNavigator()

export const HomeStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Shop" component={ShopScreen} />
  </Stack.Navigator>
)
