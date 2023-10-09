import { UserContext } from "../../contexts/userContext"
import { signin } from "../../lib/firebase"
import React, { useEffect, useState, useContext } from "react"
import { StyleSheet, SafeAreaView, ActivityIndicator, Text } from "react-native"
import { User } from "@/types/user"

export const AuthScreen: React.FC = () => {
  const { user, setUser } = useContext(UserContext)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user: User = await signin()
        setUser(user)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUser()
  }, [])
  console.log(user)
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.text}>ログイン中...</Text>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 16,
    fontSize: 12,
    color: "#888",
  },
})
