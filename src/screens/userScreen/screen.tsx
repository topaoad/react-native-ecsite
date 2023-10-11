import React, { useContext, useState } from "react"
import { StyleSheet, SafeAreaView, Text } from "react-native"
/* types */
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../../types/navigation"
import { RouteProp } from "@react-navigation/native"
import { UserContext } from "../../contexts/userContext"
import { updateUser } from "../../lib/firebase"
import { Form } from "../../components/Form"
import { Button } from "../../components/Button"
import { Loading } from "../../components/Loading"
import { Timestamp } from "firebase/firestore"

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "User">
  route: RouteProp<RootStackParamList, "User">
}

export const UserScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const { user, setUser } = useContext(UserContext)
  const [name, setName] = useState<string>(user?.name ?? "")
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async () => {
    setLoading(true)
    const updatedAt = Timestamp.fromDate(new Date())
    if (user?.id) {
      await updateUser(user.id, { name, updatedAt })
      setUser({ ...user, name, updatedAt })
    }
    setLoading(false)
  }
  return (
    <SafeAreaView style={styles.container}>
      <Form value={name} onChangeText={(text) => setName(text)} label="名前" />
      <Button onPress={onSubmit} text="保存する" />
      <Loading visible={loading} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
})
