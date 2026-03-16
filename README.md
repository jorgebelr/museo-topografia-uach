# Museo Virtual de Topografía - UACH

Museo Virtual de Topografía de la Facultad de Ingeniería de la Universidad Autónoma de Chihuahua.

## 🎯 Características y Estado Actual

- **Galería de Instrumentos**: Visualización de la colección histórica de instrumentos topográficos.
- **Vista 3D Interactiva**: Exploración de modelos `.obj` con OrbitControls personalizados (rotación X/Y manual y zoom) que preservan la calidad original del objeto.
- **Modelos 3D de Prueba Incluidos**: `Castor Ingeniería` y `Dragón Alcancía`.
- **Modo Oscuro/Claro**: Interfaz adaptable con soporte nativo.
- **Gestión de Contenido (Frontend)**: Interfaz de captura para agregar nuevos modelos al museo y sus validaciones (Zod/React Hook Form).

---

## ⚠️ AVISO PARA EL PRÓXIMO EQUIPO DE DESARROLLO

**Funcionalidad Pendiente: Conexión con Base de Datos**

Actualmente, el flujo de datos (guardar nuevas herramientas, editar o eliminar) **está simulado en el frontend**.
- Las tarjetas mostradas en la galería inicial provienen de una constante `defaultTools` en el archivo `lib/tools-data.ts`.
- Los datos y las llamadas asíncronas están preparadas, pero la API route y la integración real con una base de datos (por ejemplo, MongoDB, PostgreSQL, Firebase) **debe ser implementada**.
- **Acción requerida:** Conectar las funciones de `lib/tools-data.ts` con el backend a construir o una Base de Datos seleccionada, y asegurar el manejo de carga de archivos (Imágenes y `.obj` de Three.js) hacia algún servicio de Storage (como AWS S3, Vercel Blob o Supabase).

---

## 🚀 Tecnologías Utilizadas

- **Next.js 16**: Framework React con App Router
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Estilos utilitarios
- **shadcn/ui**: Componentes UI
- **React Hook Form & Zod**: Manejo y validación de formularios
- **React Three Fiber & Drei**: Renderizado WebGL y manejo de modelos 3D (`useLoader`, `OBJLoader`, `OrbitControls`)

## 📦 Instalación Local

```bash
# Instalar dependencias
npm install
# (Se requiere tener intalado three y three-stdlib)

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## 📁 Estructura Principal del Proyecto

```text
museo-topografia-uach/
├── app/                    # Rutas y páginas (App Router)
├── components/             # Componentes React
│   ├── ui/                 # Componentes genéricos de shadcn
│   ├── vr-viewer.tsx       # Componente principal del visor 3D (React Three Fiber)
│   └── ...                 
├── lib/                    # Utilidades y funciones
│   └── tools-data.ts       # Central de datos y simulación de peticiones (AQUI CONECTAR DB)
└── public/                 
    ├── images/             # Imágenes estáticas
    └── models/             # Aquí se deben alojar `castor.obj` y `dragon.obj` para las pruebas
```

## 🎮 Vista 3D (Instrucciones de Uso)

Los modelos `.obj` no se comprimen para preservar el 100% de la calidad original que se guardará en la base de datos.
- Puedes interactuar usando el ratón de forma libre.
- Alternativamente, utiliza los **Botones UI flotantes** dentro de la tarjeta de "Ver Detalles", los cuales permiten rotación horizontal/vertical paso a paso o control del zoom suavizado.

## 🤝 Contribuidores

- Facultad de Ingeniería - UACH
- *Proyecto en transición de desarrollo*

Desarrollado con ❤️ para preservar la historia de la topografía.
