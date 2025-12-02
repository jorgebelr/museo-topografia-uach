"use client"
import { useState, useEffect } from "react"
import { ToolCard } from "@/components/tool-card"
import { VRViewer } from "@/components/vr-viewer"
import { AddToolDialog } from "@/components/add-tool-dialog"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"
import { getTools } from "@/lib/tools-data"

export interface Tool {
  id: string
  name: string
  year: string
  type: string
  image: string
  modelUrl?: string
  era?: string
  description?: string
}

export function ToolsGallery() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null)
  const [tools, setTools] = useState<Tool[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadTools() {
      try {
        const loadedTools = await getTools()
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
    setTools((prev) => [newTool, ...prev])
  }

  return (
    <>
      <section id="catalogo" className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center gap-4 flex-wrap">
            <AddToolDialog onToolAdded={handleToolAdded} />
            <Button variant="default" className="gap-2 bg-primary hover:bg-primary/90">
              <SlidersHorizontal className="h-4 w-4" />
              Filtrar y Ordenar
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Cargando herramientas...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} onClick={() => setSelectedTool(tool)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedTool && <VRViewer tool={selectedTool} onClose={() => setSelectedTool(null)} />}
    </>
  )
}
