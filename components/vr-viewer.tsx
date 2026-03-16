"use client"

import type React from "react"
import { Suspense, useRef } from "react"
import { Canvas, useLoader } from "@react-three/fiber"
import { OrbitControls, Center, useProgress, Html } from "@react-three/drei"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js"
import { X, ZoomIn, ZoomOut, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Tool } from "@/components/tools-gallery"
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib"

interface VRViewerProps {
  tool: Tool
  onClose: () => void
}

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground font-medium">{progress.toFixed(0)}% loaded</p>
      </div>
    </Html>
  )
}

function Model({ url }: { url: string }) {
  const obj = useLoader(OBJLoader, url)
  return <primitive object={obj} />
}

export function VRViewer({ tool, onClose }: VRViewerProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null)

  const handleZoomIn = () => {
    if (controlsRef.current) {
      // Zoom in reduciendo la distancia (acercando la cámara)
      controlsRef.current.object.position.multiplyScalar(0.8)
      controlsRef.current.update()
    }
  }

  const handleZoomOut = () => {
    if (controlsRef.current) {
      // Zoom out aumentando la distancia
      controlsRef.current.object.position.multiplyScalar(1.2)
      controlsRef.current.update()
    }
  }

  const handleRotate = (axis: 'x' | 'y', direction: 1 | -1) => {
    if (controlsRef.current) {
      // Ángulo de paso de rotación (aprox 15 grados)
      const step = (Math.PI / 12) * direction

      if (axis === 'y') {
        // Rotación horizontal (azimuth)
        const currentAzimuthAngle = controlsRef.current.getAzimuthalAngle()
        controlsRef.current.setAzimuthalAngle(currentAzimuthAngle + step)
      } else {
        // Rotación vertical (polar)
        const currentPolarAngle = controlsRef.current.getPolarAngle()
        // Limitamos para que no sobrepase los límites de arriba/abajo (0 a Math.PI)
        const nextPolarAngle = Math.max(0.1, Math.min(Math.PI - 0.1, currentPolarAngle + step))
        controlsRef.current.setPolarAngle(nextPolarAngle)
      }
      controlsRef.current.update()
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-card rounded-xl shadow-2xl border-2 border-primary/20 overflow-hidden h-[80vh] flex flex-col">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-xl md:text-2xl font-bold">{tool.name}</h2>
            {tool.era && <p className="text-sm opacity-90">{tool.era}</p>}
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
        <div className="relative bg-gradient-to-br from-secondary to-muted flex-grow overflow-hidden">
          {tool.modelUrl ? (
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 2, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
              <directionalLight position={[-10, -10, -10]} intensity={0.2} />
              <Suspense fallback={<Loader />}>
                <Center>
                  <Model url={tool.modelUrl} />
                </Center>
              </Suspense>
              <OrbitControls ref={controlsRef} makeDefault autoRotate autoRotateSpeed={0.5} enableDamping dampingFactor={0.05} />
            </Canvas>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-muted-foreground">No hay modelo 3D disponible para esta herramienta.</p>
            </div>
          )}

          {/* User Controls Panel (Subtle and minimal) */}
          {tool.modelUrl && (
            <div className="absolute right-4 bottom-4 flex flex-col items-center gap-4 bg-background/60 backdrop-blur-md rounded-xl p-3 border border-border shadow-sm">
              <div className="flex flex-col gap-1 items-center">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted" onClick={() => handleRotate('x', -1)}>
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted" onClick={() => handleRotate('y', -1)}>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted" onClick={() => handleRotate('y', 1)}>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted" onClick={() => handleRotate('x', 1)}>
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </div>

              <div className="w-full h-px bg-border my-1" />

              <div className="flex flex-col gap-1 items-center">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted" onClick={handleZoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted" onClick={handleZoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Descripción Footer */}
        {tool.description && (
          <div className="p-6 bg-card shrink-0 border-t border-border">
            <h3 className="text-lg font-semibold mb-2">Descripción</h3>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              {tool.description}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
