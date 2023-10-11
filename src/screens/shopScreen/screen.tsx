import React, { useContext, useEffect, useState } from "react"
import { StyleSheet, SafeAreaView, Text, FlatList } from "react-native"
import { RouteProp } from "@react-navigation/native"
import { RootStackParamList } from "@/types/navigation"
import { StackNavigationProp } from "@react-navigation/stack"
import { ShopDetail } from "../../components/ShopDetail"
import { FloatingActionButton } from "../../components/FloatingActionButton"
import { getReviews } from "../../lib/firebase"
import { Review } from "@/types/review"
import { ReviewItem } from "../../components/ReviewItem"
import { ReviewsContext } from "../../contexts/reviewsContext"

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Shop">
  route: RouteProp<RootStackParamList, "Shop">
}

export const ShopScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const { shop } = route.params
  const { reviews, setReviews } = useContext(ReviewsContext)

  useEffect(() => {
    navigation.setOptions({ title: shop.name })
    const fetchReviews = async () => {
      const reviews = shop.id ? await getReviews(shop.id) : null
      reviews && setReviews(reviews)
    }
    fetchReviews()
  }, [shop])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={<ShopDetail shop={shop} />}
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
      <FloatingActionButton
        iconName="plus"
        onPress={() => navigation.navigate("CreateReview", { shop })}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    // textAlign: "center",
  },
})
