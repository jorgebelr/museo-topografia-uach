"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function MuseumHeader() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Evitar hidration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="flex items-center transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label="Ir al inicio"
            >
              <Image
                src="/uach-logo.png"
                alt="Logo UACH - Facultad de Ingeniería"
                width={60}
                height={60}
                className="h-12 w-12 object-contain"
                priority
              />
            </Link>
          </div>

          <h1 className="hidden md:block text-lg font-semibold text-foreground">MUSEO VIRTUAL DE TOPOGRAFÍA</h1>

          <nav className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/catalogo"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Catálogo
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9"
              aria-label="Cambiar tema"
            >
              {mounted ? (
                theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
