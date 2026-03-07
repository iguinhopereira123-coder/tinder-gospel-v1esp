import { createContext, useContext, useState } from 'react'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [gender, setGender] = useState(null)
  const [name, setName] = useState('')
  const [age, setAge] = useState('')

  const value = {
    gender,
    setGender,
    name,
    setName,
    age,
    setAge,
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used within UserProvider')
  return ctx
}
