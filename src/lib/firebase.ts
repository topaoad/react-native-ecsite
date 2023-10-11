import { Shop } from "@/types/shop"
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import {
  DocumentReference,
  Firestore,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore"
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  User,
} from "firebase/auth"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { initialUser } from "../types/user"
import { Review } from "@/types/review"

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
const db = getFirestore(app)
const storage = getStorage(app)

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

export const signin = async (): Promise<any> => {
  const auth = await getAuth()
  try {
    await signInAnonymously(auth)
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message
    console.log(errorCode, errorMessage)
  }

  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, you can get the user's information here.
        const uid = user.uid
        const userDoc = await getDoc(doc(db, "users", uid))
        if (!userDoc.data()) {
          await setDoc(doc(db, "users", uid), initialUser)
          resolve({
            ...initialUser,
            id: uid,
          })
        } else {
          const userDoc = await getDoc(doc(db, "users", uid))
          resolve({
            id: uid,
            ...userDoc.data(),
          })
        }
        // console.log(userDoc)
      } else {
        // User is signed out.
        console.log("signed out")
        reject(new Error("User is signed out"))
      }
      unsubscribe()
    })
  })
}

export const updateUser = async (userId: string, params: any) => {
  await updateDoc(doc(db, "users", userId), params)
}

export const addReview = async (shopId: string, review: Review) => {
  await addDoc(
    collection(doc(collection(db, "shops"), shopId), "reviews"),
    review,
  )
}
export const createReviewRef = async (shopId: string) => {
  const db = getFirestore()
  const reviewRef: any = doc(collection(db, "shops", shopId, "reviews"))
  console.log(reviewRef)
  return reviewRef
}

export const uploadImage = async (uri: string, path: string) => {
  // uriをblobに変換
  const localUri = await fetch(uri)
  const blob = await localUri.blob()
  // storageにアップロード

  const storageRef = ref(storage, path)

  let downloadUrl = ""
  try {
    await uploadBytes(storageRef, blob)
    downloadUrl = await getDownloadURL(storageRef)
    console.log(downloadUrl)
  } catch (err) {
    console.log(err)
    console.log("upload error")
  }
  return downloadUrl
}

export const getReviews = async (shopId: string) => {
  const reviewDocs = await getDocs(
    query(
      collection(db, "shops", shopId, "reviews"),
      orderBy("createdAt", "desc"),
    ),
  )
  return reviewDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as Review)
}
