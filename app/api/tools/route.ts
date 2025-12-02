import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Tool from "@/models/Tool"
import type { Tool as ToolType } from "@/components/tools-gallery"

export async function GET() {
  try {
    await connectDB()
    
    const tools = await Tool.find({}).sort({ createdAt: -1 }).lean()
    
    // Convertir a formato Tool (con id en lugar de _id)
    const formattedTools: ToolType[] = tools.map((tool) => ({
      id: tool._id.toString(),
      name: tool.name,
      year: tool.year,
      type: tool.type,
      image: tool.image,
      modelUrl: tool.modelUrl || undefined,
      era: tool.era || undefined,
      description: tool.description || undefined,
    }))
    
    return NextResponse.json(formattedTools)
  } catch (error) {
    console.error("Error al leer herramientas:", error)
    return NextResponse.json(
      { error: "Error al cargar las herramientas" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { name, year, type, image, modelUrl, era, description } = body

    // Validación básica
    if (!name || !year || !type || !image) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      )
    }

    // Crear nueva herramienta en MongoDB
    const newTool = new Tool({
      name,
      year,
      type,
      image,
      modelUrl: modelUrl || null,
      era: era || null,
      description: description || null,
    })

    const savedTool = await newTool.save()

    // Convertir a formato Tool (con id en lugar de _id)
    const formattedTool: ToolType = {
      id: savedTool._id.toString(),
      name: savedTool.name,
      year: savedTool.year,
      type: savedTool.type,
      image: savedTool.image,
      modelUrl: savedTool.modelUrl || undefined,
      era: savedTool.era || undefined,
      description: savedTool.description || undefined,
    }

    return NextResponse.json(formattedTool, { status: 201 })
  } catch (error) {
    console.error("Error al agregar herramienta:", error)
    return NextResponse.json(
      { error: "Error al agregar la herramienta" },
      { status: 500 }
    )
  }
}

