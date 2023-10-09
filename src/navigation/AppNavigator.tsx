import React, { useContext } from "react"
import { NavigationContainer } from "@react-navigation/native"
/* navigators */
import { MainTabNavigator } from "./MainTabNavigator"
import { AuthScreen } from "../screens/authScreen"
import { UserContext } from "../contexts/userContext"

export const AppNavigator = () => {
  const { user } = useContext(UserContext)
  return (
    <NavigationContainer>
      {!user ? <AuthScreen /> : <MainTabNavigator />}
    </NavigationContainer>
  )
}
