import { StatusBar } from "expo-status-bar"
import { FlatList, StyleSheet, Text, View, SafeAreaView } from "react-native"
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import {
  Firestore,
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { useEffect, useState } from "react"
import { Shop } from "@/types/shop"
// import { ShopReviewItem } from "@/components/ShopReviewItem";
import { ShopReviewItem } from "./src/components/ShopReviewItem"
import React from "react"

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_FIREBASE_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const db = getFirestore(app)

export default function App() {
  const [shops, setShops] = useState<Shop[]>([])
  useEffect(() => {
    const querySnapshot = async () => {
      const q = query(
        collection(db, "shops"),
        where("place", "==", "品川"),
        orderBy("score", "desc"),
      )
      const snapshot = await getDocs(q)
      const shops = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        place: doc.data().place,
        score: doc.data().score,
        imageUrl: doc.data().imageUrl,
      }))
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
