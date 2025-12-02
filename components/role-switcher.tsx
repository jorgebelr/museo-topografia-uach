"use client"

import { useUserRole } from "@/contexts/user-role-context"
import { Button } from "@/components/ui/button"
import { Eye, Edit } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function RoleSwitcher() {
  const { role, setRole } = useUserRole()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          {role === "editor" ? (
            <>
              <Edit className="h-4 w-4" />
              <span className="hidden sm:inline">Editor</span>
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Visualizador</span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setRole("viewer")}
          className={role === "viewer" ? "bg-accent" : ""}
        >
          <Eye className="h-4 w-4 mr-2" />
          Visualizador
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setRole("editor")}
          className={role === "editor" ? "bg-accent" : ""}
        >
          <Edit className="h-4 w-4 mr-2" />
          Editor
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


