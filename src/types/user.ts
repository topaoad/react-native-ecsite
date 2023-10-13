import { Timestamp } from "firebase/firestore"

export type User = {
  id?: string
  name: string
  pushToken?: string
  updatedAt: Timestamp
  createdAt: Timestamp
}

export const initialUser: User = {
  name: "",
  // updatedAt: firebase.firestore.Timestamp.now(),
  // createdAt: firebase.firestore.Timestamp.now(),
  // 今のローカル時間を取得する
  updatedAt: Timestamp.fromDate(new Date()),
  createdAt: Timestamp.fromDate(new Date()),
}
