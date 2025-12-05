import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error(
    "Por favor define la variable de entorno MONGODB_URI en .env.local"
  )
}

/**
 * Global es usado aquí para mantener una instancia en caché de la conexión
 * en desarrollo. Esto previene que la conexión crezca exponencialmente
 * durante las recargas de módulos en desarrollo.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
  // Si ya hay una conexión activa, retornarla
  if (cached.conn) {
    return cached.conn
  }

  // Si no hay una promesa de conexión en curso, crear una
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default connectDB
