import firebase from "firebase/compat/app"

export type User = {
  id?: string
  name: string
  pushToken?: string
  updatedAt: string
  createdAt: string
}

export const initialUser: User = {
  name: "",
  // updatedAt: firebase.firestore.Timestamp.now(),
  // createdAt: firebase.firestore.Timestamp.now(),
  // 今のローカル時間を取得する
  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
}
