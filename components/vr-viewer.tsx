"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { X, RotateCw, ZoomIn, ZoomOut, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Tool } from "@/components/tools-gallery"

interface VRViewerProps {
  tool: Tool
  onClose: () => void
}

export function VRViewer({ tool, onClose }: VRViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Fondo con gradiente
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2,
      )
      gradient.addColorStop(0, "rgba(139, 92, 246, 0.1)")
      gradient.addColorStop(1, "rgba(79, 70, 229, 0.05)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Dibujar representación 3D simplificada
      ctx.save()
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.scale(zoom, zoom)
      ctx.rotate(rotation.y * 0.01)

      // Sombra
      ctx.shadowColor = "rgba(139, 92, 246, 0.3)"
      ctx.shadowBlur = 20
      ctx.shadowOffsetX = 10
      ctx.shadowOffsetY = 10

      // Cuerpo principal del instrumento
      ctx.fillStyle = "#6366f1"
      ctx.fillRect(-60, -80, 120, 160)

      // Detalles
      ctx.fillStyle = "#8b5cf6"
      ctx.fillRect(-50, -70, 100, 20)
      ctx.fillRect(-50, 50, 100, 20)

      // Lente/visor
      ctx.beginPath()
      ctx.arc(0, 0, 30, 0, Math.PI * 2)
      ctx.fillStyle = "#a78bfa"
      ctx.fill()

      // Reflejo en el lente
      ctx.beginPath()
      ctx.arc(-10, -10, 10, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
      ctx.fill()

      ctx.restore()

      requestAnimationFrame(animate)
    }

    animate()
  }, [rotation, zoom])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setLastPos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - lastPos.x
    const deltaY = e.clientY - lastPos.y

    setRotation((prev) => ({
      x: prev.x + deltaY,
      y: prev.y + deltaX,
    }))

    setLastPos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-card rounded-xl shadow-2xl border-2 border-primary/20 overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-balance">{tool.name}</h2>
            {tool.era && (
              <p className="text-sm text-primary-foreground/80">{tool.era}</p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Visor 3D */}
        <div className="relative bg-gradient-to-br from-secondary to-muted">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="w-full h-[400px] md:h-[600px] cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />

          {/* Controles */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-background/90 backdrop-blur-sm rounded-lg p-2 border border-border">
            <Button size="icon" variant="ghost" onClick={() => setRotation({ x: 0, y: 0 })} title="Reiniciar rotación">
              <RotateCw className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setZoom((prev) => Math.min(prev + 0.2, 3))}
              title="Acercar"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setZoom((prev) => Math.max(prev - 0.2, 0.5))}
              title="Alejar"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={() => setZoom(1)} title="Tamaño original">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Instrucciones */}
          <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-border max-w-xs">
            <p className="text-sm text-muted-foreground text-pretty leading-relaxed">
              <strong className="text-foreground">Arrastra</strong> para rotar •
              <strong className="text-foreground"> Usa los controles</strong> para zoom
            </p>
          </div>
        </div>

        {/* Información */}
        {tool.description && (
          <div className="p-6 bg-card">
            <h3 className="text-lg font-semibold mb-2 text-foreground">Descripción</h3>
            <p className="text-muted-foreground text-pretty leading-relaxed">{tool.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}
