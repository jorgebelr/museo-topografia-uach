import { MuseumHero } from "@/components/museum-hero"
import { ToolsGallery } from "@/components/tools-gallery"
import { MuseumFooter } from "@/components/museum-footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <MuseumHero />
      <ToolsGallery />
      <MuseumFooter />
    </main>
  )
}
