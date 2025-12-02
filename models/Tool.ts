import mongoose, { Schema, Document } from "mongoose"

export interface ITool extends Document {
  name: string
  year: string
  type: string
  image: string
  modelUrl?: string
  era?: string
  description?: string
  createdAt?: Date
  updatedAt?: Date
}

const ToolSchema = new Schema<ITool>(
  {
    name: {
      type: String,
      required: [true, "El nombre es requerido"],
      trim: true,
    },
    year: {
      type: String,
      required: [true, "El año es requerido"],
    },
    type: {
      type: String,
      required: [true, "El tipo es requerido"],
      enum: ["Donación", "Adquisición", "Préstamo", "Otro"],
    },
    image: {
      type: String,
      required: [true, "La imagen es requerida"],
    },
    modelUrl: {
      type: String,
      default: null,
    },
    era: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
  }
)

// Evitar recompilar el modelo si ya existe
const Tool = mongoose.models.Tool || mongoose.model<ITool>("Tool", ToolSchema)

export default Tool


