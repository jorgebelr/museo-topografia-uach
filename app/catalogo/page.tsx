"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ToolCard } from "@/components/tool-card"
import { VRViewer } from "@/components/vr-viewer"
import { AddToolDialog } from "@/components/add-tool-dialog"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"
import { getTools } from "@/lib/tools-data"
import type { Tool } from "@/components/tools-gallery"
import { MuseumFooter } from "@/components/museum-footer"

// Función para obtener la década de un año
function getDecade(year: string): number {
  const yearNum = parseInt(year)
  if (isNaN(yearNum)) return 0
  return Math.floor(yearNum / 10) * 10
}

// Función para agrupar herramientas por década
function groupByDecade(tools: Tool[]): Map<number, Tool[]> {
  const grouped = new Map<number, Tool[]>()
  
  tools.forEach((tool) => {
    const decade = getDecade(tool.year)
    if (!grouped.has(decade)) {
      grouped.set(decade, [])
    }
    grouped.get(decade)!.push(tool)
  })
  
  // Ordenar dentro de cada década por año (más viejo primero)
  grouped.forEach((tools, decade) => {
    tools.sort((a, b) => {
      const yearA = parseInt(a.year) || 0
      const yearB = parseInt(b.year) || 0
      return yearA - yearB
    })
  })
  
  return grouped
}

export default function CatalogoPage() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null)
  const [tools, setTools] = useState<Tool[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadTools() {
      try {
        const loadedTools = await getTools()
        // Ordenar todas las herramientas por año (más viejo primero)
        loadedTools.sort((a, b) => {
          const yearA = parseInt(a.year) || 0
          const yearB = parseInt(b.year) || 0
          return yearA - yearB
        })
        setTools(loadedTools)
      } catch (error) {
        console.error("Error al cargar herramientas:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadTools()
  }, [])

  function handleToolAdded(newTool: Tool) {
    setTools((prev) => {
      const updated = [newTool, ...prev]
      // Reordenar después de agregar
      updated.sort((a, b) => {
        const yearA = parseInt(a.year) || 0
        const yearB = parseInt(b.year) || 0
        return yearA - yearB
      })
      return updated
    })
  }

  const toolsByDecade = groupByDecade(tools)
  const decades = Array.from(toolsByDecade.keys()).sort((a, b) => a - b)

  return (
    <main className="min-h-screen relative">
      {/* Imagen de fondo */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/catalogo-background.jpg"
          alt="Fondo del Catálogo"
          fill
          className="object-cover"
          quality={90}
          priority={false}
        />
        {/* Overlay oscuro para mejorar legibilidad del texto */}
        <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]" />
        {/* Overlay con gradiente para mejor contraste */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20" />
      </div>

      {/* Contenido */}
      <section className="relative z-10 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 drop-shadow-lg">
              Catálogo de Instrumentos
            </h1>
            <p className="text-foreground/90 mb-6 drop-shadow-md">
              Explora nuestra colección histórica de instrumentos topográficos organizados por década
            </p>
            
            <div className="flex items-center gap-4 flex-wrap">
              <AddToolDialog onToolAdded={handleToolAdded} />
              <Button variant="default" className="gap-2 bg-primary hover:bg-primary/90">
                <SlidersHorizontal className="h-4 w-4" />
                Filtrar y Ordenar
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Cargando herramientas...</p>
            </div>
          ) : decades.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No hay herramientas en el catálogo</p>
            </div>
          ) : (
            <div className="space-y-12">
              {decades.map((decade) => {
                const decadeTools = toolsByDecade.get(decade)!
                return (
                  <div key={decade} className="space-y-4">
                    <div className="border-b border-primary/30 pb-2">
                      <h2 className="text-2xl md:text-3xl font-bold text-primary drop-shadow-md">
                        Década de {decade}s
                      </h2>
                      <p className="text-sm text-foreground/80 mt-1 drop-shadow-sm">
                        {decadeTools.length} {decadeTools.length === 1 ? "instrumento" : "instrumentos"} ({decade} - {decade + 9})
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {decadeTools.map((tool) => (
                        <ToolCard 
                          key={tool.id} 
                          tool={tool} 
                          onClick={() => setSelectedTool(tool)} 
                        />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <MuseumFooter />

      {selectedTool && (
        <VRViewer tool={selectedTool} onClose={() => setSelectedTool(null)} />
      )}
    </main>
  )
}

