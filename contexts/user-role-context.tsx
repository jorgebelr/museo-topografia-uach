"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type UserRole = "viewer" | "editor"

interface UserRoleContextType {
  role: UserRole
  setRole: (role: UserRole) => void
  isEditor: boolean
  isViewer: boolean
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined)

export function UserRoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>("viewer")

  // Cargar el rol desde localStorage al iniciar
  useEffect(() => {
    const savedRole = localStorage.getItem("userRole") as UserRole | null
    if (savedRole === "editor" || savedRole === "viewer") {
      setRoleState(savedRole)
    }
  }, [])

  // Guardar el rol en localStorage cuando cambie
  const setRole = (newRole: UserRole) => {
    setRoleState(newRole)
    localStorage.setItem("userRole", newRole)
  }

  return (
    <UserRoleContext.Provider
      value={{
        role,
        setRole,
        isEditor: role === "editor",
        isViewer: role === "viewer",
      }}
    >
      {children}
    </UserRoleContext.Provider>
  )
}

export function useUserRole() {
  const context = useContext(UserRoleContext)
  if (context === undefined) {
    throw new Error("useUserRole must be used within a UserRoleProvider")
  }
  return context
}


