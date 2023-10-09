import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
/* screens */
import { HomeScreen } from "../screens/homeScreen"
import { ShopScreen } from "../screens/shopScreen"
import { RootStackParamList } from "@/types/navigation"
import { CreateReviewScreen } from "../screens/createReviewScreen"

const Stack = createStackNavigator<RootStackParamList>()
const RootStack = createStackNavigator<RootStackParamList>()

export const HomeStackNavigator = () => (
  // 通常の画面用とモーダル用の2つのグループを作成
  <RootStack.Navigator>
    <RootStack.Group
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
    </RootStack.Group>
    <RootStack.Group screenOptions={{ presentation: "modal" }}>
      <RootStack.Screen name="CreateReview" component={CreateReviewScreen} />
    </RootStack.Group>
  </RootStack.Navigator>
)
