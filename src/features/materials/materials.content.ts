import type { MaterialData } from '@/types/material.types'

export const materials: MaterialData[] = [
  {
    id: 'wood',
    name: 'Madera',
    description: 'Calidez, acústica y tactilidad para interiores de larga vida.',
    applications: ['Revestimientos', 'Cielos falsos', 'Mobiliario integrado'],
    image: 'https://images.unsplash.com/photo-1533090368676-1fd25485db88?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'concrete',
    name: 'Hormigón',
    description: 'Masa, estructura y una presencia honesta que envejece con carácter.',
    applications: ['Muros portantes', 'Pavimentos', 'Volúmenes escultóricos'],
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'glass',
    name: 'Vidrio',
    description: 'Transparencia controlada para conectar interior, paisaje y luz.',
    applications: ['Fachadas', 'Patios', 'Divisiones interiores'],
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'stone',
    name: 'Piedra',
    description: 'Textura, permanencia y anclaje territorial.',
    applications: ['Basamentos', 'Muros exteriores', 'Piezas focales'],
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'metal',
    name: 'Metal',
    description: 'Precisión constructiva para detalles, sombra y ligereza.',
    applications: ['Celosías', 'Escaleras', 'Estructuras livianas'],
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1200&auto=format&fit=crop',
  },
]
