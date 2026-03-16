import type { Tool } from "@/components/tools-gallery"

// Datos estáticos por defecto (fallback)
const defaultTools: Tool[] = [
  {
    id: "castor-ingenieria",
    name: "Castor Ingeniería",
    year: "2024",
    type: "Modelo",
    image: "/images/placeholder-castor.jpg", // Debes colocar una miniatura real luego
    modelUrl: "/models/castor.obj",
    era: "Contemporáneo",
    description: "Modelo 3D de Castor de Ingeniería.",
  },
  {
    id: "dragon-alcancia",
    name: "Dragón Alcancía",
    year: "2024",
    type: "Modelo",
    image: "/images/placeholder-dragon.jpg", // Debes colocar una miniatura real luego
    modelUrl: "/models/dragon.obj",
    era: "Contemporáneo",
    description: "Modelo 3D interactivo del Dragón Alcancía.",
  }
]

export async function getTools(): Promise<Tool[]> {
  try {
    const response = await fetch("/api/tools", {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error("Error al cargar las herramientas")
    }

    return response.json()
  } catch (error) {
    // Fallback silencioso a datos por defecto
    return defaultTools
  }
}

export async function addTool(tool: Omit<Tool, "id">): Promise<Tool> {
  const response = await fetch("/api/tools", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tool),
  })

  if (!response.ok) {
    throw new Error("Error al agregar la herramienta")
  }

  return response.json()
}

export async function updateTool(id: string, tool: Partial<Omit<Tool, "id">>): Promise<Tool> {
  const response = await fetch(`/api/tools/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tool),
  })

  if (!response.ok) {
    throw new Error("Error al actualizar la herramienta")
  }

  return response.json()
}

export async function deleteTool(id: string): Promise<void> {
  const response = await fetch(`/api/tools/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Error al eliminar la herramienta")
  }
}
