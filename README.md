# Museo Virtual de Topografía - UACH

Museo Virtual de Topografía de la Facultad de Ingeniería de la Universidad Autónoma de Chihuahua.

## 🎯 Características

- **Galería de Instrumentos**: Visualiza la colección histórica de instrumentos topográficos
- **Vista 3D Interactiva**: Explora modelos 3D de los instrumentos con rotación y zoom
- **Modo Oscuro/Claro**: Interfaz adaptable con soporte para dark mode
- **Gestión de Contenido**: Agrega nuevos modelos al museo mediante formulario
- **Subida de Archivos**: Sistema de carga de imágenes automático

## 🎨 Paleta de Colores

- **Azul/Cian**: `#007AA6` - Color primario
- **Naranja/Terracota**: Color de acento
- **Colores Neutros**: Para fondos y texto

## 🚀 Tecnologías

- **Next.js 16**: Framework React con App Router
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Estilos utilitarios
- **shadcn/ui**: Componentes UI
- **React Hook Form**: Manejo de formularios
- **Zod**: Validación de esquemas

## 📦 Instalación

```bash
# Instalar dependencias
pnpm install

# Ejecutar en desarrollo
pnpm dev

# Construir para producción
pnpm build

# Iniciar en producción
pnpm start
```

## 📁 Estructura del Proyecto

```
museo-topografia-uach/
├── app/                    # Rutas y páginas (App Router)
│   ├── api/               # API Routes
│   ├── globals.css        # Estilos globales
│   └── layout.tsx         # Layout principal
├── components/            # Componentes React
│   ├── ui/               # Componentes UI reutilizables
│   └── ...               # Componentes específicos
├── lib/                   # Utilidades y funciones
├── public/                # Archivos estáticos
│   └── images/           # Imágenes del museo
└── data/                  # Datos JSON (temporal)
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env.local` si necesitas configuraciones específicas:

```env
# Ejemplo para producción
NEXT_PUBLIC_API_URL=https://api.example.com
```

## 📝 Uso

### Agregar Nuevo Modelo

1. Haz clic en el botón "Agregar Modelo" en la sección de catálogo
2. Completa el formulario con la información del instrumento
3. Selecciona una imagen desde tu computadora
4. La imagen se subirá automáticamente
5. Guarda el modelo

### Vista 3D

- **Arrastra** para rotar el modelo
- Usa los **controles de zoom** para acercar/alejar
- Haz clic en "Ver Detalles" en cualquier tarjeta de instrumento

## 🗄️ Base de Datos

Actualmente los datos se almacenan en `data/tools.json`. El proyecto está preparado para migrar a una base de datos:

- Las funciones en `lib/tools-data.ts` tienen comentarios `TODO` indicando dónde conectar la BD
- Las API routes en `app/api/tools/route.ts` están listas para usar con una base de datos

## 🎨 Personalización

### Colores

Los colores se definen en `app/globals.css` usando el formato OKLCH:

```css
--primary: oklch(0.47 0.13 210); /* Azul #007AA6 */
--accent: oklch(0.65 0.15 40);   /* Naranja/Terracota */
```

## 📄 Licencia

Este proyecto es propiedad de la Universidad Autónoma de Chihuahua.

## 👥 Contribuidores

- Facultad de Ingeniería - UACH

---

Desarrollado con ❤️ para preservar la historia de la topografía


