import firebase from "firebase/compat/app"
import { Timestamp } from "firebase/firestore"

type UserRef = {
  id: string
  name: string
}

type ShopRef = {
  id: string
  name: string
}

export type Review = {
  id?: string
  text: string
  score: number
  imageUrl: string
  user: UserRef
  shop: ShopRef
  updatedAt: Timestamp
  createdAt: Timestamp
}
