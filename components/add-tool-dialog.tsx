"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Tool } from "@/components/tools-gallery"
import { addTool } from "@/lib/tools-data"

const toolFormSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  year: z.string().min(1, "El año es requerido"),
  type: z.string().min(1, "El tipo es requerido"),
  image: z.string().min(1, "La URL de la imagen es requerida"),
  modelUrl: z.string().optional(),
  era: z.string().optional(),
  description: z.string().optional(),
})

type ToolFormValues = z.infer<typeof toolFormSchema>

interface AddToolDialogProps {
  onToolAdded?: (tool: Tool) => void
}

export function AddToolDialog({ onToolAdded }: AddToolDialogProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string>("")

  const form = useForm<ToolFormValues>({
    resolver: zodResolver(toolFormSchema),
    defaultValues: {
      name: "",
      year: "",
      type: "",
      image: "",
      modelUrl: "",
      era: "",
      description: "",
    },
  })

  // Limpiar estado cuando se cierra el diálogo
  useEffect(() => {
    if (!open) {
      form.reset()
      setUploadedImage("")
    }
  }, [open, form])

  async function handleFileUpload(file: File) {
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Error al subir la imagen")
      }

      const data = await response.json()
      setUploadedImage(data.path)
      form.setValue("image", data.path)
    } catch (error) {
      console.error("Error al subir archivo:", error)
      alert(error instanceof Error ? error.message : "Error al subir la imagen")
    } finally {
      setIsUploading(false)
    }
  }

  async function onSubmit(values: ToolFormValues) {
    setIsSubmitting(true)
    try {
      const newTool = await addTool(values)
      form.reset()
      setUploadedImage("")
      setOpen(false)
      onToolAdded?.(newTool)
      // TODO: Mostrar notificación de éxito
    } catch (error) {
      console.error("Error al agregar herramienta:", error)
      // TODO: Mostrar notificación de error
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          Agregar Modelo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Modelo al Museo</DialogTitle>
          <DialogDescription>
            Completa el formulario para agregar un nuevo instrumento topográfico a la colección.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Instrumento *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Teodolito T2 - 1955" {...field} />
                  </FormControl>
                  <FormDescription>
                    Nombre completo del instrumento topográfico
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Año *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: 1955" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Donación">Donación</SelectItem>
                        <SelectItem value="Adquisición">Adquisición</SelectItem>
                        <SelectItem value="Préstamo">Préstamo</SelectItem>
                        <SelectItem value="Otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagen *</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          accept="image/*"
                          className="cursor-pointer"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              handleFileUpload(file)
                            }
                          }}
                          disabled={isUploading}
                        />
                        {isUploading && (
                          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        )}
                      </div>
                      {uploadedImage && (
                        <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                          <span className="text-sm text-muted-foreground">
                            Imagen subida:
                          </span>
                          <span className="text-sm font-medium text-foreground">
                            {uploadedImage}
                          </span>
                        </div>
                      )}
                      <Input
                        type="hidden"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Selecciona una imagen desde tu computadora (JPG, PNG, WebP - máximo 5MB)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="modelUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL del Modelo 3D (Opcional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="/models/nombre-modelo.glb"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Ruta al archivo del modelo 3D en formato GLB
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="era"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Época (Opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: 1955" {...field} />
                  </FormControl>
                  <FormDescription>
                    Año o período histórico del instrumento
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descripción detallada del instrumento..."
                      className="min-h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Información adicional sobre el instrumento y su uso
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Agregar Modelo"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

