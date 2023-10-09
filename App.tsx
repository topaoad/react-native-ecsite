import React, { useState } from "react"
import { AppNavigator } from "./src/navigation/AppNavigator"
/* contexts */
import { UserContext } from "./src/contexts/userContext"
import { User } from "./src/types/user"

export default function App() {
  const [user, setUser] = useState<User | null>(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AppNavigator />
    </UserContext.Provider>
  )
}
