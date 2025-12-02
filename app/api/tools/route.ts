import { NextRequest, NextResponse } from "next/server"
import { readFileSync, writeFileSync } from "fs"
import { join } from "path"
import type { Tool } from "@/components/tools-gallery"

// Esta función será reemplazada por operaciones de base de datos
export async function GET() {
  try {
    // TODO: Reemplazar con consulta a base de datos
    // Ejemplo: const tools = await db.tools.findMany()
    
    const filePath = join(process.cwd(), "data", "tools.json")
    const fileContents = readFileSync(filePath, "utf8")
    const tools = JSON.parse(fileContents) as Tool[]
    
    return NextResponse.json(tools)
  } catch (error) {
    console.error("Error al leer herramientas:", error)
    return NextResponse.json(
      { error: "Error al cargar las herramientas" },
      { status: 500 }
    )
  }
}

// Esta función será reemplazada por operaciones de base de datos
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, year, type, image, modelUrl, era, description } = body

    // Validación básica
    if (!name || !year || !type || !image) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      )
    }

    // Generar ID único
    const id = `tool-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const newTool: Tool = {
      id,
      name,
      year,
      type,
      image,
      modelUrl: modelUrl || undefined,
      era: era || undefined,
      description: description || undefined,
    }

    // TODO: Reemplazar con inserción en base de datos
    // Ejemplo: const savedTool = await db.tools.create({ data: newTool })
    
    // Por ahora, escribimos en el archivo JSON
    const filePath = join(process.cwd(), "data", "tools.json")
    const fileContents = readFileSync(filePath, "utf8")
    const tools = JSON.parse(fileContents) as Tool[]
    
    tools.push(newTool)
    writeFileSync(filePath, JSON.stringify(tools, null, 2), "utf8")

    return NextResponse.json(newTool, { status: 201 })
  } catch (error) {
    console.error("Error al agregar herramienta:", error)
    return NextResponse.json(
      { error: "Error al agregar la herramienta" },
      { status: 500 }
    )
  }
}

