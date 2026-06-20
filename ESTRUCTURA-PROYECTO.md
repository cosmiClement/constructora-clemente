# 📐 Constructora Clemente — Guía Completa del Proyecto

> **Regla de oro:** El 90% de los cambios que necesitarás hacer (textos, imágenes, servicios, FAQ, etc.) están en archivos `*.content.ts`. No toques el componente `.tsx` salvo que quieras cambiar el layout o comportamiento visual.

---

## 🗂 Estructura general de carpetas

```
d:\ARQUITECTURA\constructora-clemente\
│
├── src/
│   ├── app/                    ← Configuración global de la app
│   │   ├── errors/             ← Pantalla de error global
│   │   ├── layouts/            ← Layout raíz (navbar + footer + cursor)
│   │   ├── providers/          ← (reservado para futuros providers)
│   │   └── routes/             ← Enrutador React Router
│   │
│   ├── assets/                 ← Archivos estáticos (videos, imágenes locales)
│   │   └── images/casita.mp4   ← Video del hero
│   │
│   ├── components/             ← Componentes reutilizables (sin lógica de negocio)
│   │   ├── animations/         ← Cursor, preloader, texto reveal
│   │   ├── layout/             ← Navbar y Footer
│   │   ├── shared/             ← (reservado para componentes compartidos)
│   │   └── ui/                 ← Primitivas: Button, Container, Section
│   │
│   ├── features/               ← ⭐ SECCIONES DE LA PÁGINA (aquí vive todo)
│   │   ├── about/              ← Sección "Sobre nosotros"
│   │   ├── comparison/         ← Sección "Antes y después"
│   │   ├── contact/            ← Sección "Formulario de contacto"
│   │   ├── cta/                ← Sección "Call to action" final
│   │   ├── faq/                ← Sección "Preguntas frecuentes"
│   │   ├── gallery/            ← Galería inspiracional con filtros
│   │   ├── hero/               ← Primera sección (video de fondo)
│   │   ├── journey/            ← Transformación (scroll pinneado)
│   │   ├── materials/          ← Biblioteca de materiales
│   │   ├── model-viewer/       ← Visualizador 3D interactivo
│   │   ├── philosophy/         ← Filosofía de diseño
│   │   ├── process/            ← Proceso de trabajo (pasos)
│   │   ├── projects/           ← Proyectos destacados (carrusel)
│   │   ├── services/           ← Servicios ofrecidos
│   │   ├── statistics/         ← Estadísticas / números
│   │   └── walkthrough/        ← Recorrido arquitectónico
│   │
│   ├── hooks/                  ← Custom hooks de React
│   │   └── scroll/             ← useScrollToSection (scroll suave a sección)
│   │
│   ├── lib/                    ← Utilidades y setup de librerías
│   │   ├── gsap.ts             ← Inicializa GSAP + ScrollTrigger
│   │   └── utils.ts            ← Función cn() para clases condicionales
│   │
│   ├── pages/                  ← Páginas completas (componen features)
│   │   └── home/HomePage.tsx   ← Ensambla todas las secciones en orden
│   │
│   ├── store/                  ← Estado global (Zustand)
│   │   └── globalStore.ts      ← Estado del cursor (default/hover)
│   │
│   ├── styles/
│   │   └── globals.css         ← CSS global: fuentes, variables, scrollbar
│   │
│   ├── types/                  ← Tipos TypeScript compartidos
│   │   ├── material.types.ts   ← Tipo MaterialData
│   │   ├── project.types.ts    ← Tipos ProjectData y JourneySpace
│   │   └── video.ts            ← (tipos de video)
│   │
│   ├── App.tsx                 ← Punto de entrada React (ErrorBoundary + Router)
│   └── main.tsx                ← Monta la app en el DOM
│
├── public/                     ← Archivos públicos (favicon, etc.)
├── tailwind.config.js          ← Tokens de diseño (colores, fuentes, sombras)
├── vite.config.ts              ← Config de Vite (alias @/ → src/)
└── package.json                ← Dependencias del proyecto
```

---

## 🧩 Patrón de cada Feature

Cada sección sigue exactamente este patrón:

```
features/[nombre-sección]/
├── [NombreSeccion].tsx         ← COMPONENTE: layout visual, animaciones
└── [nombre-sección].content.ts ← CONTENIDO: todos los textos, URLs, datos
```

> ✅ Para cambiar textos o imágenes → edita solo el `.content.ts`
> ✅ Para cambiar el diseño/layout → edita el `.tsx`

---

## 🔧 Guía de modificaciones por sección

---

### 🏠 HERO — Primera pantalla con video

| Archivo | Ruta |
|---------|------|
| Componente | `src/features/hero/Hero.tsx` |
| **Contenido** | `src/features/hero/hero.content.ts` ← **EDITAR AQUÍ** |
| Video | `src/assets/images/casita.mp4` |

**¿Qué puedes cambiar en `hero.content.ts`?**

```ts
export const heroContent = {
  eyebrow: 'ARQUITECTURA • CONSTRUCCIÓN • DIRECCIÓN DE OBRA', // texto pequeño arriba
  title: 'Creamos espacios que transforman la forma de vivir', // título grande
  description: 'En Constructora Clemente...',  // párrafo descriptivo
  cta: 'Explorar proyectos',           // texto del botón principal
  secondaryCta: 'Solicitar asesoría',  // texto del botón secundario
  video: casaHero,                     // importa el video desde assets/
}
```

**Para cambiar el video:**
1. Coloca tu video `.mp4` en `src/assets/images/`
2. Cambia la importación en `hero.content.ts`:

```ts
import miVideo from '@/assets/images/mi-video-nuevo.mp4'
// ...
video: miVideo,
```

---

### 💭 PHILOSOPHY — Frase filosófica con scroll reveal

| Archivo | Ruta |
|---------|------|
| Componente | `src/features/philosophy/Philosophy.tsx` |
| **Contenido** | `src/features/philosophy/philosophy.content.ts` |

```ts
export const philosophyContent = {
  eyebrow: 'Filosofía de diseño',       // etiqueta pequeña
  titleLineOne: 'Creemos en la pureza', // primera línea del título
  titleLineTwo: 'de las formas.',       // segunda línea (aparece en cursiva)
  description: 'Nuestra arquitectura no busca...' // texto que se revela al hacer scroll
}
```

---

### 🎬 TRANSFORMATION / JOURNEY — Scroll con imágenes encadenadas

| Archivo | Ruta |
|---------|------|
| Componente | `src/features/journey/Transformation.tsx` |
| **Contenido** | `src/features/journey/journey.content.ts` |

Muestra etapas que se van revelando al hacer scroll (GSAP ScrollTrigger pinneado).

```ts
export const transformationStages = [
  {
    id: 'idea',
    title: 'Idea',                          // título de la etapa
    desc: 'La intención espacial nace...',  // descripción
    image: 'https://...',                   // URL de imagen (Unsplash o local)
  },
  // ... más etapas
]
```

Para agregar/quitar etapas: agrega o elimina objetos del array. No hay límite fijo.

---

### 🏗 ABOUT — Sobre nosotros

| Archivo | Ruta |
|---------|------|
| **Componente+Contenido** | `src/features/about/AboutUs.tsx` |

Esta sección tiene el contenido directamente en el componente (es texto simple). Para modificarla edita los textos directamente en el JSX:

```tsx
<h2>Más de 15 años construyendo experiencias.</h2>
<p>Somos una constructora especializada...</p>
```

---

### 🔨 SERVICES — Tarjetas de servicios

| Archivo | Ruta |
|---------|------|
| Componente | `src/features/services/Services.tsx` |
| **Contenido** | `src/features/services/services.content.ts` |

```ts
export const servicesContent = {
  eyebrow: 'Nuestras Especialidades',
  title: 'Soluciones Constructivas Integrales',
  description: 'Abarcamos todas las fases...',
  services: [
    {
      id: '01',                          // número visible en la tarjeta
      title: 'Residencial de Lujo',     // nombre del servicio
      description: 'Casas personalizadas...',  // descripción
    },
    // agregar más servicios aquí con id: '05', etc.
  ]
}
```

Para agregar un servicio: copia un objeto `{ id, title, description }` y agrégalo al array.

---

### 🏛 PROJECTS — Carrusel de proyectos

| Archivo | Ruta |
|---------|------|
| Componente | `src/features/projects/FeaturedProjects.tsx` |
| **Contenido** | `src/features/projects/projects.content.ts` |
| Tipo | `src/types/project.types.ts` |

```ts
export const featuredProjects: ProjectData[] = [
  {
    id: 'casa-nube',              // ID único (sin espacios)
    name: 'Casa Nube',            // nombre del proyecto
    location: 'Valle alto',       // ubicación
    concept: 'Una vivienda...',   // párrafo concepto
    problem: 'El terreno tenía...', // problema que se resolvió
    solution: 'Creamos plataformas...', // cómo se resolvió
    result: 'Una casa fresca...', // resultado
    image: 'https://...',        // imagen principal
    tags: ['Residencial', 'Sostenible', 'Diseño Bioclimático'], // chips de tags
    year: 2023,                  // año del proyecto
  },
  // ... más proyectos
]
```

---

### 🚶 WALKTHROUGH — Recorrido por espacios

| Archivo | Ruta |
|---------|------|
| Componente | `src/features/walkthrough/ArchitecturalWalkthrough.tsx` |
| **Contenido** | `src/features/walkthrough/walkthrough.content.ts` |
| Tipo | `src/types/project.types.ts` → `JourneySpace` |

```ts
export const walkthroughSpaces: JourneySpace[] = [
  {
    id: 'facade',
    name: 'Fachada',                              // título del espacio
    description: 'Un umbral sobrio que filtra...', // descripción
    image: 'https://...',                          // imagen del espacio
  },
  // más espacios (se muestran en grilla de 2 columnas)
]
```

---

### 🖼 GALLERY — Galería con filtros

| Archivo | Ruta |
|---------|------|
| Componente | `src/features/gallery/InspirationGallery.tsx` |
| **Contenido** | `src/features/gallery/gallery.content.ts` |

```ts
// Categorías disponibles como filtros:
export const galleryFilters = ['Todos', 'Interior', 'Exterior', 'Detalle'] as const

// Imágenes de la galería:
export const galleryItems = [
  {
    id: 'g-1',
    category: 'Interior',     // debe coincidir con un valor de galleryFilters
    title: 'Luz rasante',     // pie de foto
    image: 'https://...',     // URL de imagen
  },
]
```

Para agregar categorías: agrega el texto en el array `galleryFilters` y úsalo como `category` en los items.

---

### ↔ BEFORE/AFTER — Comparador deslizable

| Archivo | Ruta |
|---------|------|
| **Componente** | `src/features/comparison/BeforeAfter.tsx` |

Las imágenes están en el componente directamente:

```tsx
// BeforeAfter.tsx línea ~17:
src="https://[URL-IMAGEN-ANTES]"    // imagen "antes" (grises)

// línea ~23:
src="https://[URL-IMAGEN-DESPUÉS]"  // imagen "después" (a color)
```

---

### 🎲 MODEL VIEWER — Visualizador 3D

| Archivo | Ruta |
|---------|------|
| **Componente** | `src/features/model-viewer/ModelViewer.tsx` |

```ts
const materialOptions = [
  { id: 'travertine', label: 'Travertino', color: '#c8b89d' }, // cambia el color hex
  { id: 'concrete',   label: 'Hormigón',   color: '#8d8a82' },
  { id: 'obsidian',   label: 'Obsidiana',  color: '#171717' },
]
```

---

### ⚙️ PROCESS — Pasos del proceso

| Archivo | Ruta |
|---------|------|
| **Componente** | `src/features/process/WorkProcess.tsx` |

```ts
const processSteps = [
  'Reunión inicial',
  'Conceptualización',
  'Diseño',
  'Renderizado',
  'Construcción',
  'Entrega',
]
```

Para agregar/quitar pasos: modifica este array. El layout se ajusta automáticamente.

---

### 📊 STATISTICS — Números destacados

| Archivo | Ruta |
|---------|------|
| **Componente** | `src/features/statistics/PremiumStats.tsx` |

```ts
const stats = [
  { value: '+15',     label: 'años de experiencia' },
  { value: '+300',    label: 'proyectos desarrollados' },
  { value: '+50.000', label: 'm² diseñados' },
  { value: '98%',     label: 'satisfacción de clientes' },
]
```

---

### 🧱 MATERIALS — Biblioteca de materiales

| Archivo | Ruta |
|---------|------|
| Componente | `src/features/materials/MaterialLibrary.tsx` |
| **Contenido** | `src/features/materials/materials.content.ts` |
| Tipo | `src/types/material.types.ts` → `MaterialData` |

```ts
export const materials: MaterialData[] = [
  {
    id: 'wood',                              // ID (debe ser del tipo MaterialType)
    name: 'Madera',
    description: 'Calidez, acústica...',
    applications: ['Revestimientos', 'Cielos falsos', 'Mobiliario integrado'],
    image: 'https://...',
  },
]
```

⚠️ Para agregar un material nuevo:
1. Agrega su ID a `MaterialType` en `src/types/material.types.ts`
2. Agrega el objeto en `materials.content.ts`

---

### ❓ FAQ — Preguntas frecuentes

| Archivo | Ruta |
|---------|------|
| Componente | `src/features/faq/Faq.tsx` |
| **Contenido** | `src/features/faq/faq.content.ts` |

```ts
export const faqContent = {
  eyebrow: 'Preguntas Frecuentes',
  title: 'Resolvemos tus Dudas',
  faqs: [
    {
      question: '¿Gestionan los permisos municipales?',
      answer: 'Sí. Nos encargamos de todo el proceso...',
    },
    // agregar más preguntas aquí
  ]
}
```

---

### 📬 CONTACT — Formulario de contacto

| Archivo | Ruta |
|---------|------|
| Componente | `src/features/contact/Contact.tsx` |
| **Contenido** | `src/features/contact/contact.content.ts` |

```ts
export const contactContent = {
  eyebrow: 'Contacto',
  title: 'Iniciemos tu Proyecto',
  description: 'Completa el formulario...',
  form: {
    name: 'Nombre Completo',
    email: 'Correo Electrónico',
    projectType: 'Tipo de Proyecto',
    budget: 'Presupuesto Estimado',
    location: 'Ubicación del Terreno',
    message: 'Cuéntanos sobre tu visión...',
    submit: 'Solicitar Asesoría',
  },
  contactInfo: {
    address: 'Av. Arquitectura 123, Distrito Financiero',
    email: 'proyectos@constructoraclemente.com',
    phone: '+1 (555) 123-4567',
  }
}
```

---

### 🎯 FINAL CTA — Llamado a la acción final

| Archivo | Ruta |
|---------|------|
| **Componente** | `src/features/cta/FinalCTA.tsx` |

```ts
// Línea ~6 — cambiar el email de contacto:
window.location.href = 'mailto:contacto@constructoraclemente.com?subject=...'

// Imagen de fondo línea ~12:
src="https://images.unsplash.com/..."
```

---

## 🎨 Sistema de diseño (Tailwind)

Todo el sistema visual está en `tailwind.config.js`.

### Colores

| Token | Valor | Uso |
|-------|-------|-----|
| `bg-stone-950` | #0c0a09 | Fondo oscuro principal |
| `bg-stone-900` | — | Fondo ligeramente más claro |
| `bg-stone-100` | #e7e5e4 | Secciones claras |
| `bg-stone-50`  | #f5f5f4 | Fondo muy claro |
| `text-stone-400` | — | Texto secundario |
| `text-amber-700` | — | Acento dorado |

### Tipografía

| Clase | Fuente | Uso |
|-------|--------|-----|
| `font-sans` | Inter | Textos generales, etiquetas |
| `font-serif` | Playfair Display | Títulos grandes, H1, H2 |

Para cambiar las fuentes:
1. `globals.css` línea 2: cambia la URL de Google Fonts
2. `tailwind.config.js` líneas 31-32: actualiza `fontFamily`

### Espaciados frecuentes

| Clase | Significado |
|-------|-------------|
| `py-28 md:py-40` | Padding vertical estándar de sección |
| `py-32 md:py-48` | Padding vertical de sección grande |
| `px-6 lg:px-12` | Padding horizontal del Container |
| `max-w-7xl` | Ancho máximo del contenido |

---

## 🧠 Componentes reutilizables

### Button — `src/components/ui/Button.tsx`

```tsx
<Button variant="light">Texto</Button>    // fondo blanco (por defecto)
<Button variant="dark">Texto</Button>     // fondo negro
<Button variant="outline">Texto</Button>  // borde transparente

// Con evento:
<Button onClick={() => scrollToSection('contact')}>Contactar</Button>
```

### Container — `src/components/ui/Container.tsx`

```tsx
<Container>
  {/* contenido centrado con max-w-7xl y padding horizontal */}
</Container>

<Container className="relative z-10">
  {/* con clases adicionales */}
</Container>
```

---

## 🗺 Orden de las secciones en la página

El orden se define en `src/pages/home/HomePage.tsx`:

```
1.  Hero                 (video pantalla completa)
2.  Philosophy           (frase filosófica)
3.  Transformation       (scroll pinneado con etapas)
4.  AboutUs              (sobre nosotros)
5.  Services             (tarjetas de servicios)
6.  FeaturedProjects     (carrusel de proyectos)
7.  ArchitecturalWalkthrough (recorrido de espacios)
8.  InspirationGallery   (galería con filtros)
9.  BeforeAfter          (comparador antes/después)
10. ModelViewer          (visualizador 3D)
11. WorkProcess          (proceso de trabajo)
12. PremiumStats         (estadísticas)
13. MaterialLibrary      (biblioteca de materiales)
14. Faq                  (preguntas frecuentes)
15. Contact              (formulario)
16. FinalCTA             (CTA final)
```

Para reordenar secciones: mueve las líneas del JSX en `HomePage.tsx`.
Para ocultar una sección: comenta o elimina su línea en `HomePage.tsx`.

---

## 🔗 Navegación (Navbar)

Los links del menú se definen en `src/components/layout/Navbar.tsx`:

```ts
const navItems = [
  { label: 'Nosotros', sectionId: 'about' },    // sectionId debe coincidir con
  { label: 'Servicios', sectionId: 'services' }, // el id="" de la <section>
  { label: 'Proyectos', sectionId: 'projects' },
  { label: 'Proceso', sectionId: 'process' },
  { label: 'FAQ', sectionId: 'faq' },
]
```

Para agregar un link al menú:
1. Agrega `{ label: 'Mi Sección', sectionId: 'mi-seccion' }` al array
2. Asegúrate de que el `<section id="mi-seccion">` exista en el componente correspondiente

---

## 📦 Dependencias principales

| Librería | Para qué sirve |
|----------|----------------|
| `framer-motion` | Animaciones declarativas (fade, slide, etc.) |
| `gsap` + `ScrollTrigger` | Animaciones de scroll avanzadas (parallax, pin) |
| `lenis` | Scroll suave inercial |
| `@react-three/fiber` | Renderizado 3D (Three.js en React) |
| `@react-three/drei` | Helpers para 3D (controles, Environment) |
| `zustand` | Estado global (cursor custom) |
| `react-router-dom` | Enrutamiento (actualmente una sola ruta `/`) |
| `lucide-react` | Iconos (Menu, X, Plus, ArrowUpRight) |
| `clsx` + `tailwind-merge` | Clases CSS condicionales con la función `cn()` |

---

## ⚡ Comandos útiles

```bash
npm run dev      # Iniciar servidor de desarrollo
npm run build    # Compilar para producción
npm run preview  # Vista previa del build
npm run lint     # Revisar errores de linting
```

---

## 🚨 Reglas importantes

- Cuando agregas un **nuevo material** en `materials.content.ts`, también debes
  agregar su `id` al tipo `MaterialType` en `src/types/material.types.ts`.

- El alias `@/` en los imports equivale a `src/`.
  Ejemplo: `@/components/ui/Button` → `src/components/ui/Button.tsx`

- Para imágenes de Unsplash, usa siempre el parámetro
  `?q=80&w=1800&auto=format&fit=crop` al final de la URL.

- El componente `ScrollRevealText` usa `useTransform` dentro de un `.map()`.
  Es una excepción controlada de las reglas de React Hooks. No mover esta
  lógica a otros componentes sin adaptarla correctamente.
