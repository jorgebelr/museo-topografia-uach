"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useUserRole } from "@/contexts/user-role-context"
import { EditToolDialog } from "@/components/edit-tool-dialog"
import { DeleteToolDialog } from "@/components/delete-tool-dialog"
import type { Tool } from "@/components/tools-gallery"

interface ToolCardProps {
  tool: Tool
  onClick: () => void
  onToolUpdated?: (tool: Tool) => void
  onToolDeleted?: (toolId: string) => void
}

export function ToolCard({ tool, onClick, onToolUpdated, onToolDeleted }: ToolCardProps) {
  const { isEditor } = useUserRole()

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden bg-card">
      <CardContent className="p-0">
        <div className="aspect-square bg-muted/50 relative overflow-hidden">
          <Image
            src={tool.image || "/placeholder.svg"}
            alt={tool.name}
            fill
            className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-foreground">{tool.name}</h3>
            <p className="text-sm text-primary">Tipo: {tool.type}</p>
          </div>

          <div className="space-y-2">
            <Button onClick={onClick} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium">
              Ver Detalles
            </Button>
            
            {isEditor && (
              <div className="flex gap-2">
                <EditToolDialog tool={tool} onToolUpdated={onToolUpdated} />
                <DeleteToolDialog tool={tool} onToolDeleted={onToolDeleted} />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
