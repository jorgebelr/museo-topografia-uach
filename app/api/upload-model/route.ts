import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json(
        { error: "No se proporcionó ningún archivo" },
        { status: 400 }
      )
    }

    // Validar que sea un archivo .obj
    const fileName = file.name.toLowerCase()
    if (!fileName.endsWith(".obj")) {
      return NextResponse.json(
        { error: "El archivo debe ser un archivo .obj" },
        { status: 400 }
      )
    }

    // Validar tamaño (máximo 50MB para modelos 3D)
    const maxSize = 50 * 1024 * 1024 // 50MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "El archivo es demasiado grande. Máximo 50MB" },
        { status: 400 }
      )
    }

    // Generar nombre único para el archivo
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = file.name.split(".").pop()
    const newFileName = `${timestamp}-${randomString}.${extension}`

    // Ruta donde se guardará el archivo
    const uploadDir = join(process.cwd(), "public", "models")
    const filePath = join(uploadDir, newFileName)

    // Crear directorio si no existe
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Convertir el archivo a buffer y guardarlo
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // Retornar la ruta relativa que se usará en el frontend
    const modelPath = `/models/${newFileName}`

    return NextResponse.json({ 
      success: true,
      path: modelPath,
      fileName: newFileName 
    })
  } catch (error) {
    console.error("Error al subir modelo 3D:", error)
    return NextResponse.json(
      { error: "Error al subir el modelo 3D" },
      { status: 500 }
    )
  }
}

