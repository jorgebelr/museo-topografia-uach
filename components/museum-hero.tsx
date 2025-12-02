import Image from "next/image"

export function MuseumHero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden py-16 md:py-20 border-b min-h-[500px] md:min-h-[600px] flex items-center"
    >
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-background.jpg"
          alt="Fondo del Museo Virtual de Topografía"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Overlay oscuro para mejorar legibilidad del texto */}
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
        {/* Overlay con gradiente para mejor contraste */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20" />
      </div>

      {/* Contenido */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance drop-shadow-lg">
            Bienvenido al Museo Virtual de Topografía
          </h2>

          <p className="text-lg md:text-xl text-foreground/90 mb-4 text-pretty leading-relaxed drop-shadow-md">
            Explora la colección histórica de instrumentos topográficos de la Universidad Autónoma de Chihuahua. Haz
            clic en cualquier herramienta para verla en 3D interactivo.
          </p>
        </div>
      </div>
    </section>
  )
}
