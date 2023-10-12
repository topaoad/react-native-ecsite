import * as ImagePicker from "expo-image-picker"
import Constants from "expo-constants"

const getCameraRollPermission = async () => {
  if (Constants.platform?.ios) {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    if (status !== "granted") {
      alert("画像を選択するためにはカメラロールの許可が必要です")
    }
  } else if (Constants.platform?.android) {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== "granted") {
      alert(
        "To select an image, permission to access the media library is required.",
      )
    }
  }
}

export const pickImage = async () => {
  // パーミッションの取得
  const permission = await getCameraRollPermission()
  if (permission !== undefined) {
    return
  }
  // ImagePicker起動
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
  })
  if (!result.canceled) {
    return result.assets[0].uri
  }
}
