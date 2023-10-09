import React from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native"
import { Feather } from "@expo/vector-icons"
import { FeatherIconName } from "@/types/iconName"

type Props = {
  onPress: (event: GestureResponderEvent) => void
  name: FeatherIconName
  color?: string
}

export const IconButton: React.FC<Props> = ({
  onPress,
  name,
  color = "#000",
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Feather name={name as FeatherIconName} color={color} size={32} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
})
