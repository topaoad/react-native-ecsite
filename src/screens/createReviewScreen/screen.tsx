import React, { useContext, useLayoutEffect, useRef, useState } from "react"
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native"
/* components */
import { IconButton } from "../../components/IconButton"
import { TextArea } from "../../components/TextArea"
import { StarInput } from "../../components/StarInput"
import { Button } from "../../components/Button"
/* types */
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../../types/navigation"
import { RouteProp } from "@react-navigation/native"
import { Review } from "@/types/review"
import { addReview, uploadImage, createReviewRef } from "../../lib/firebase"
import { Timestamp } from "firebase/firestore"
import { UserContext } from "../../contexts/userContext"
import { pickImage } from "../../lib/imagePicker"
import { getExtention } from "../../utils/file"
import { ReviewsContext } from "../../contexts/reviewsContext"

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "CreateReview">
  route: RouteProp<RootStackParamList, "CreateReview">
}

export const CreateReviewScreen: React.FC<Props> = ({
  navigation,
  route,
}: Props) => {
  const { shop } = route.params
  const [text, setText] = useState<string>("")
  const [score, setScore] = useState<number>(3)
  const [loading, setLoading] = useState<boolean>(false)
  const { user } = useContext(UserContext)
  const [imageUri, setImageUri] = useState<string>("")
  const { reviews, setReviews } = useContext(ReviewsContext)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: shop.name,
      headerLeft: () => (
        <IconButton onPress={() => navigation.goBack()} name="x" />
      ),
    })
  }, [navigation, shop])

  const onPickImage = async () => {
    const uri = await pickImage()
    uri && setImageUri(uri)
  }

  const onSubmit = async () => {
    setLoading(true)

    // documentのidを先に取得
    const reviewDocRef = shop.id ? await createReviewRef(shop.id) : null
    // storageのpathを決定
    const ext = getExtention(imageUri)
    const storagePath = `reviews/${reviewDocRef?.id}.${ext}`
    // 画像をstorageにアップロード
    let downloadUrl = ""

    if (imageUri) {
      downloadUrl = await uploadImage(imageUri, storagePath)
    }
    // firestoreに保存する
    const review = {
      user: {
        id: user?.id,
        name: user?.name,
      },
      shop: {
        id: shop.id,
        name: shop.name,
      },
      text,
      score,
      imageUrl: downloadUrl,
      updatedAt: Timestamp.fromDate(new Date()),
      createdAt: Timestamp.fromDate(new Date()),
    } as Review
    if (shop.id) {
      await addReview(shop.id, review)
    }
    // reviewDocRef && (await reviewDocRef.set(review))
    setReviews((prevReviews: Review[]) => [review, ...prevReviews])
    setLoading(false)
    navigation.goBack()
  }

  const inputRef = useRef<TextInput>(null)
  const handlePress = () => {
    Keyboard.dismiss()
  }
  return (
    <SafeAreaView style={styles.container}>
      <StarInput score={score} onChangeScore={(value) => setScore(value)} />
      <TouchableOpacity onPress={handlePress}>
        <View style={[styles.textContainer]}>
          <Text style={styles.label}>"レビュー"</Text>
          <TextInput
            ref={inputRef}
            style={styles.input}
            onChangeText={(value) => {
              setText(value)
            }}
            value={text}
            multiline={true}
            placeholder="レビューを書いてください"
          />
        </View>
        <View style={styles.photoContainer}>
          <IconButton onPress={onPickImage} name="camera" color="gray" />
          {!!imageUri && (
            <Image source={{ uri: imageUri }} style={styles.image} />
          )}
        </View>
      </TouchableOpacity>
      <Button text="レビューを投稿する" onPress={onSubmit} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  photoContainer: {
    margin: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 8,
  },
  textContainer: {
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
