import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Tool from "@/models/Tool"
import type { Tool as ToolType } from "@/components/tools-gallery"
import mongoose from "mongoose"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const { id } = params
    const body = await request.json()
    const { name, year, type, image, modelUrl, era, description } = body

    // Validar que el ID sea válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 }
      )
    }

    // Buscar y actualizar la herramienta
    const updatedTool = await Tool.findByIdAndUpdate(
      id,
      {
        name,
        year,
        type,
        image,
        modelUrl: modelUrl || null,
        era: era || null,
        description: description || null,
      },
      { new: true, runValidators: true }
    )

    if (!updatedTool) {
      return NextResponse.json(
        { error: "Herramienta no encontrada" },
        { status: 404 }
      )
    }

    // Convertir a formato Tool
    const formattedTool: ToolType = {
      id: updatedTool._id.toString(),
      name: updatedTool.name,
      year: updatedTool.year,
      type: updatedTool.type,
      image: updatedTool.image,
      modelUrl: updatedTool.modelUrl || undefined,
      era: updatedTool.era || undefined,
      description: updatedTool.description || undefined,
    }

    return NextResponse.json(formattedTool)
  } catch (error) {
    console.error("Error al actualizar herramienta:", error)
    return NextResponse.json(
      { error: "Error al actualizar la herramienta" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const { id } = params

    // Validar que el ID sea válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 }
      )
    }

    // Buscar y eliminar la herramienta
    const deletedTool = await Tool.findByIdAndDelete(id)

    if (!deletedTool) {
      return NextResponse.json(
        { error: "Herramienta no encontrada" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error al eliminar herramienta:", error)
    return NextResponse.json(
      { error: "Error al eliminar la herramienta" },
      { status: 500 }
    )
  }
}

