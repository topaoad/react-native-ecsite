import { Shop } from "@/types/shop"
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore"
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  User,
} from "firebase/auth"
import { initialUser } from "../types/user"

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
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, you can get the user's information here.
        const uid = user.uid
        // const isAnonymous = user.isAnonymous
        // const displayName = user.displayName
        // const photoURL = user.photoURL
        // const email = user.email
        // const emailVerified = user.emailVerified
        // const phoneNumber = user.phoneNumber
        // const providerData = user.providerData
        // resolve(user)
        const userDoc = await getDoc(doc(db, "users", uid))
        if (!userDoc.exists) {
          await setDoc(doc(db, "users", uid), initialUser)
          resolve({
            ...initialUser,
            id: uid,
          })
        } else {
          resolve({
            id: uid,
            ...userDoc.data(),
          })
        }
      } else {
        // User is signed out.
        console.log("signed out")
        reject(new Error("User is signed out"))
      }
    })
  })
}

// リファクタ案
// export const signin = async () => {
//   const auth = await getAuth()
//   const signInPromise = signInAnonymously(auth)

//   return new Promise((resolve, reject) => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       try {
//         if (user) {
//           // User is signed in, you can get the user's information here.
//           // ...
//           resolve(user)
//         } else {
//           // User is signed out.
//           console.log("signed out")
//           reject(new Error("User is signed out"))
//         }
//       } catch (error) {
//         reject(error)
//       }
//     })

//     signInPromise
//       .then(() => {
//         // Signed in..
//       })
//       .catch((error) => {
//         const errorCode = error.code
//         const errorMessage = error.message
//         console.log(errorCode, errorMessage)
//         unsubscribe()
//         reject(error)
//       })
//   })
// }
