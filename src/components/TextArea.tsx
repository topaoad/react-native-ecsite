import React, { useRef } from "react"
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native"

type Props = {
  onChangeText: (text: string) => void
  value: string
  label: string
  height?: number
  placeholder?: string
}

export const TextArea: React.FC<Props> = ({
  value,
  onChangeText,
  label,
  height,
  placeholder,
}: Props) => {
  const inputRef = useRef<TextInput>(null)

  const handleBlur = () => {
    Keyboard.dismiss()
  }

  const handlePress = () => {
    Keyboard.dismiss()
    inputRef.current?.blur()
  }

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={[styles.container, !!height && { height }]}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          ref={inputRef}
          style={styles.input}
          onChangeText={(text) => onChangeText(text)}
          value={value}
          multiline={true}
          placeholder={placeholder}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 120,
    borderColor: "#999",
    borderBottomWidth: 1,
    marginTop: 8,
  },
  label: {
    fontWeight: "bold",
    color: "#999",
  },
})
