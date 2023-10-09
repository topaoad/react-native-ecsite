import React, { useState } from "react"
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs"
import { Feather } from "@expo/vector-icons"
/* navigators */
import { HomeStackNavigator } from "./HomeStackNavigator"
/* screens */
import { UserScreen } from "../screens/userScreen"
/* types */
import { RootStackParamList } from "../types/navigation"
import { ViewStyle } from "react-native"
import { FeatherIconName } from "@/types/iconName"

const Tab = createBottomTabNavigator<RootStackParamList>()

export const MainTabNavigator = () => {
  const screenOptions = ({ route }: any) => ({
    tabBarIcon: ({ focused, color, size }: any) => {
      let iconName

      if (route.name === "Home") {
        iconName = "home"
      } else if (route.name === "User") {
        iconName = "user"
      } else {
        iconName = "info" // default icon
      }

      return (
        <Feather name={iconName as FeatherIconName} size={size} color={color} />
      )
    },
    tabBarActiveTintColor: "#900",
    tabBarInactiveTintColor: "#999",
    headerShown: false,
    // ここでタブバーを非表示にしている
    tabBarStyle: {
      // display: "none",
    } as ViewStyle,
  })

  return (
    <>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Home" component={HomeStackNavigator} />
        <Tab.Screen name="User" component={UserScreen} />
      </Tab.Navigator>
    </>
  )
}
