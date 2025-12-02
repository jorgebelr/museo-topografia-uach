# Guía de Configuración de MongoDB

Esta guía te ayudará a configurar MongoDB para el proyecto Museo Virtual de Topografía.

## 📋 Pasos para Configurar MongoDB

### Opción 1: MongoDB Atlas (Recomendado - Cloud)

1. **Crear cuenta en MongoDB Atlas**
   - Ve a https://www.mongodb.com/cloud/atlas/register
   - Crea una cuenta gratuita

2. **Crear un Cluster**
   - Una vez dentro, haz clic en "Build a Database"
   - Selecciona el plan gratuito (M0)
   - Elige una región cercana (por ejemplo: N. Virginia)
   - Crea el cluster (puede tardar 3-5 minutos)

3. **Configurar Acceso a la Base de Datos**
   - Ve a "Database Access" en el menú lateral
   - Haz clic en "Add New Database User"
   - Elige "Password" como método de autenticación
   - Crea un usuario y contraseña (guárdalos bien)
   - Asigna el rol "Atlas admin" o "Read and write to any database"
   - Haz clic en "Add User"

4. **Configurar Acceso de Red**
   - Ve a "Network Access" en el menú lateral
   - Haz clic en "Add IP Address"
   - Para desarrollo local, haz clic en "Allow Access from Anywhere" (0.0.0.0/0)
   - O agrega tu IP específica para mayor seguridad
   - Haz clic en "Confirm"

5. **Obtener la Connection String**
   - Ve a "Database" en el menú lateral
   - Haz clic en "Connect" en tu cluster
   - Selecciona "Connect your application"
   - Copia la connection string (se verá algo como):
     ```
     mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Reemplaza `<password>` con tu contraseña de usuario
   - Reemplaza `?retryWrites=true&w=majority` con el nombre de tu base de datos:
     ```
     mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/museo-topografia-uach?retryWrites=true&w=majority
     ```

### Opción 2: MongoDB Local

1. **Instalar MongoDB**
   ```bash
   # macOS (con Homebrew)
   brew tap mongodb/brew
   brew install mongodb-community
   
   # Iniciar MongoDB
   brew services start mongodb-community
   ```

2. **Connection String Local**
   ```
   mongodb://localhost:27017/museo-topografia-uach
   ```

## 🔧 Configuración del Proyecto

1. **Crear archivo `.env.local`**
   ```bash
   # En la raíz del proyecto
   touch .env.local
   ```

2. **Agregar la variable de entorno**
   Abre `.env.local` y agrega:
   ```env
   MONGODB_URI=mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/museo-topografia-uach?retryWrites=true&w=majority
   ```
   
   O para MongoDB local:
   ```env
   MONGODB_URI=mongodb://localhost:27017/museo-topografia-uach
   ```

3. **Reiniciar el servidor de desarrollo**
   ```bash
   # Detén el servidor (Ctrl+C) y vuelve a iniciarlo
   pnpm dev
   ```

## ✅ Verificar la Conexión

Una vez configurado, el proyecto debería conectarse automáticamente a MongoDB cuando:
- Agregues un nuevo modelo desde el formulario
- Cargues la página de catálogo

Si hay errores, revisa:
- Que la variable `MONGODB_URI` esté correctamente definida en `.env.local`
- Que el archivo `.env.local` esté en la raíz del proyecto
- Que MongoDB Atlas tenga tu IP permitida (si usas Atlas)
- Que el usuario y contraseña sean correctos

## 📦 Estructura de la Base de Datos

### Colección: `tools`

Cada documento tiene la siguiente estructura:
```json
{
  "_id": "ObjectId",
  "name": "Teodolito T2 - 1955",
  "year": "1955",
  "type": "Donación",
  "image": "/images/teodolito-t2-1955.jpg",
  "modelUrl": "/models/teodolito-t2.obj",
  "era": "1955",
  "description": "Instrumento de medición angular...",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## 🔄 Migración de Datos Existentes

Si tienes datos en `data/tools.json` y quieres migrarlos a MongoDB:

1. Puedes usar el formulario para agregar cada herramienta manualmente
2. O crear un script de migración (puedo ayudarte con esto si lo necesitas)

## 🛠️ Comandos Útiles

```bash
# Verificar que MongoDB está corriendo (local)
brew services list

# Detener MongoDB (local)
brew services stop mongodb-community

# Iniciar MongoDB (local)
brew services start mongodb-community
```

## 📝 Notas Importantes

- **Nunca subas `.env.local` a Git** - Ya está en `.gitignore`
- **MongoDB Atlas gratuito** tiene límites (512MB de almacenamiento)
- **Para producción**, considera usar variables de entorno en tu plataforma de hosting (Vercel, etc.)

## 🆘 Solución de Problemas

### Error: "MONGODB_URI is not defined"
- Verifica que el archivo `.env.local` existe en la raíz
- Verifica que la variable se llama exactamente `MONGODB_URI`
- Reinicia el servidor de desarrollo

### Error: "Authentication failed"
- Verifica que el usuario y contraseña sean correctos
- Asegúrate de haber reemplazado `<password>` en la connection string

### Error: "IP not whitelisted"
- Ve a Network Access en MongoDB Atlas
- Agrega tu IP actual o permite acceso desde cualquier IP (0.0.0.0/0)

---

¿Necesitas ayuda? Revisa los logs del servidor para más detalles del error.


