import { FlatList, StyleSheet, Text, View, SafeAreaView } from "react-native"
import { useEffect, useState } from "react"
import { Shop } from "@/types/shop"
// import { ShopReviewItem } from "@/components/ShopReviewItem";
import { ShopReviewItem } from "./src/components/ShopReviewItem"
import React from "react"
import { getShops } from "./src/lib/firebase"

export default function App() {
  const [shops, setShops] = useState<Shop[]>([])
  useEffect(() => {
    const querySnapshot = async () => {

      const shops = await getShops()
      setShops(shops)
    }
    querySnapshot()
  }, [])
  console.log(shops)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flatListContainer}>
        <FlatList
          data={shops}
          renderItem={({ item }: { item: Shop }) => (
            <ShopReviewItem shop={item} />
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
        />
      </View>
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
