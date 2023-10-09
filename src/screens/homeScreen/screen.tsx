import React, { useEffect, useState } from "react"
import { StyleSheet, FlatList, SafeAreaView, View } from "react-native"
/* lib */
import { getShops } from "../../lib/firebase"
/* components */
import { ShopReviewItem } from "../../components/ShopReviewItem"
/* types */
import { Shop } from "@/types/shop"
import { RootStackParamList } from "@/types/navigation"
import { StackNavigationProp } from "@react-navigation/stack"

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Home">
}

export const HomeScreen = ({ navigation }: Props) => {
  const [shops, setShops] = useState<Shop[]>([])

  useEffect(() => {
    getFirebaseItems()
  }, [])

  const getFirebaseItems = async () => {
    const shops = await getShops()
    setShops(shops)
  }

  const onPressShop = (shop: Shop) => {
    navigation.navigate("Shop", { shop })
  }
  console.log(shops)
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.flatListContainer}> */}
      <FlatList
        data={shops}
        renderItem={({ item }: { item: Shop }) => (
          <ShopReviewItem shop={item} onPress={() => onPressShop(item)} />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
      {/* </View> */}
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
  flatListContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
})
