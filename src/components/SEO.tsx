import { Helmet } from 'react-helmet-async'

interface SEOProps {
    title?: string
    description?: string
    keywords?: string
    ogImage?: string
    ogType?: string
    canonicalUrl?: string
    schema?: Record<string, unknown>
    noindex?: boolean
}

// Schema.org base para Constructora Clemente - LocalBusiness
const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Constructora Clemente',
    alternateName: 'Clemente Arquitectura y Construcción',
    description:
        'Empresa de arquitectura y construcción en Cochabamba, Bolivia. Más de 10 años de experiencia en diseño arquitectónico, construcción residencial, comercial y dirección de obra.',
    url: 'https://constructoraclemente.com',
    logo: 'https://constructoraclemente.com/logo.png',
    image: 'https://constructoraclemente.com/og-image.jpg',
    telephone: '+591-4-XXX-XXXX',
    email: 'proyectos@constructoraclemente.com',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'Av. América Oeste N° XXX',
        addressLocality: 'Cochabamba',
        addressRegion: 'Cochabamba',
        addressCountry: 'BO',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: '-17.3833',
        longitude: '-66.1667',
    },
    areaServed: {
        '@type': 'City',
        name: 'Cochabamba',
        containedInPlace: {
            '@type': 'Country',
            name: 'Bolivia',
        },
    },
    serviceType: [
        'Arquitectura',
        'Construcción',
        'Dirección de Obra',
        'Diseño de Interiores',
        'Remodelación',
        'Construcción Residencial',
        'Construcción Comercial',
    ],
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios de Construcción y Arquitectura',
        itemListElement: [
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Diseño Arquitectónico',
                    description: 'Proyectos arquitectónicos personalizados en Cochabamba',
                },
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Construcción Residencial',
                    description: 'Casas y viviendas de lujo en Cochabamba',
                },
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Dirección de Obra',
                    description: 'Supervisión profesional de obras en Bolivia',
                },
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Diseño de Interiores',
                    description: 'Interiores residenciales y comerciales',
                },
            },
        ],
    },
    priceRange: '$$$',
    openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
    },
    sameAs: [
        'https://www.facebook.com/constructoraclemente',
        'https://www.instagram.com/constructoraclemente',
        'https://www.linkedin.com/company/constructora-clemente',
    ],
}

// Schema.org para el sitio web
const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Constructora Clemente',
    url: 'https://constructoraclemente.com',
    potentialAction: {
        '@type': 'SearchAction',
        target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://constructoraclemente.com/buscar?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
    },
}

export function SEO({
    title = 'Constructora Clemente | Arquitecto y Construcción en Cochabamba, Bolivia',
    description =
    'Más de 10 años diseñando y construyendo proyectos arquitectónicos en Cochabamba, Bolivia. Especialistas en arquitectura residencial, comercial, dirección de obra y diseño de interiores. Solicita tu asesoría gratuita.',
    keywords = 'constructora cochabamba, arquitecto cochabamba, empresa construccion bolivia, proyectos arquitectonicos, direccion obra cochabamba, construccion residencial, diseno interiores cochabamba, arquitectura bolivia, constructora confiable cochabamba',
    ogImage = 'https://constructoraclemente.com/og-image.jpg',
    ogType = 'website',
    canonicalUrl = 'https://constructoraclemente.com',
    schema,
    noindex = false,
}: SEOProps) {
    const schemas = [localBusinessSchema, websiteSchema]
    if (schema) {
        schemas.push(schema as (typeof localBusinessSchema))
    }

    return (
        <Helmet>
            {/* ====== BÁSICOS ====== */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={canonicalUrl} />
            <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />

            {/* ====== GEO-TAGGING PARA SEO LOCAL BOLIVIA ====== */}
            <meta name="geo.region" content="BO-C" />
            <meta name="geo.placename" content="Cochabamba" />
            <meta name="geo.position" content="-17.3833;-66.1667" />
            <meta name="ICBM" content="-17.3833, -66.1667" />
            <meta name="language" content="es" />
            <meta httpEquiv="content-language" content="es-BO" />

            {/* ====== OPEN GRAPH ====== */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:locale" content="es_BO" />
            <meta property="og:site_name" content="Constructora Clemente" />

            {/* ====== TWITTER CARDS ====== */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* ====== SCHEMA.ORG JSON-LD ====== */}
            {schemas.map((s, i) => (
                <script key={i} type="application/ld+json">
                    {JSON.stringify(s)}
                </script>
            ))}
        </Helmet>
    )
}

// FAQ Schema helper para usar en la sección FAQ
export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    }

    return (
        <Helmet>
            <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        </Helmet>
    )
}
