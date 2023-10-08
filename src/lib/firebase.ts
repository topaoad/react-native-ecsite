import { Shop } from "@/types/shop"
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
// const analytics = getAnalytics(app)
const db = getFirestore(app)

export const getShops = async (): Promise<Shop[]> => {
  const q = query(collection(db, "shops"), orderBy("score", "desc"))
  const snapshot = await getDocs(q)
  const shops = snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    place: doc.data().place,
    score: doc.data().score,
    imageUrl: doc.data().imageUrl,
  }))
  return shops
}
