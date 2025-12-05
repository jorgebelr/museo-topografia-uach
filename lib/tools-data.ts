import type { Tool } from "@/components/tools-gallery"

// Datos estáticos por defecto (fallback)
const defaultTools: Tool[] = [
  {
    id: "teodolito-t2-1",
    name: "Teodolito T2 - 1955",
    year: "1955",
    type: "Donación",
    image: "/images/teodolito-t2-1955.jpg",
    modelUrl: "/models/teodolito-t2.glb",
    era: "1955",
    description: "Instrumento de medición angular de alta precisión utilizado en topografía.",
  },
  {
    id: "teodolito-t2-2",
    name: "Teodolito T2 - 1955",
    year: "1955",
    type: "Donación",
    image: "/images/teodolito-tripod.jpg",
    modelUrl: "/models/teodolito-t2.glb",
    era: "1955",
    description: "Instrumento de medición angular de alta precisión utilizado en topografía.",
  },
  {
    id: "sokkia-diluantarto",
    name: "Sokkia Diluantarto",
    year: "2000",
    type: "Donación",
    image: "/images/sokkia-total-station.jpg",
    modelUrl: "/models/sokkia-total.glb",
    era: "2000",
    description: "Estación total moderna con capacidades de medición electrónica.",
  },
  {
    id: "teodolito-t2-3",
    name: "Teodolito T2 - 1955",
    year: "1955",
    type: "Donación",
    image: "/images/teodolito-yellow.jpg",
    modelUrl: "/models/teodolito-t2.glb",
    era: "1955",
    description: "Instrumento de medición angular de alta precisión utilizado en topografía.",
  },
  {
    id: "teodalita-1952",
    name: "Teodalita - 1952",
    year: "1952",
    type: "Donación",
    image: "/images/teodalita-chain.jpg",
    modelUrl: "/models/teodalita.glb",
    era: "1952",
    description: "Instrumento topográfico clásico para medición de ángulos horizontales y verticales.",
  },
  {
    id: "sokkia-axatedia",
    name: "Sokkia Axatedia",
    year: "1998",
    type: "Donación",
    image: "/images/sokkia-staff.jpg",
    modelUrl: "/models/sokkia-staff.glb",
    era: "1998",
    description: "Mira topográfica profesional para mediciones de altura.",
  },
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
