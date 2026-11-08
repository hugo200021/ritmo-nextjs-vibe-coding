# Ritmo · Next.js 16 + TypeScript + Vibe Coding

Aplicación web de productividad creada como práctica evaluada de **Vibe Coding**. Permite registrar, completar, buscar y eliminar tareas; consultar estadísticas; y recibir una recomendación mediante una **API interna** desarrollada con Route Handlers de Next.js.

> **URL de producción:** `PENDIENTE: pegar aquí el dominio generado por Vercel tras el despliegue`. No se declara un despliegue que todavía no se ha realizado.

## Funcionalidades

- Cuatro páginas públicas con **App Router**: `/` (inicio), `/tareas`, `/estadisticas` y `/guia`.
- CRUD de tareas en el navegador: crear, completar/descompletar, filtrar, buscar y eliminar.
- Almacenamiento local mediante `localStorage` (sin contraseñas ni base de datos externa).
- Indicadores y barras de avance, globales y por categoría.
- **API interna** `GET /api/recomendacion?prioridad=alta|media|baja`, que devuelve consejos y tiempos de enfoque en JSON.
- Consumo de la API con `fetch`, `useEffect`, `useState` y `AbortController`; interfaz de **carga**, **error** y botón de **reintentar**.
- **Server Components**: páginas y `layout.tsx`. **Client Components**: navegación, tareas, estadísticas y widget de recomendaciones.
- **CSS Modules** + estilos globales, diseño responsive para móvil y escritorio.
- `loading.tsx`, `error.tsx` y `not-found.tsx`.

## Tecnologías

**Next.js 16**, **React 19**, **TypeScript**, **App Router**, **CSS Modules**, **React Hooks**, **Route Handlers** y **Vercel** para el despliegue recomendado.

## Requisitos previos

- Node.js **20.9 o superior**.
- npm y Git.

## Instalación local

```bash
npm install
```

Copia el archivo `.env.example` a `.env.local` (opcional: la app funciona sin variables externas):

**PowerShell (Windows):**
```powershell
Copy-Item .env.example .env.local
```

**Linux/macOS:**
```bash
cp .env.example .env.local
```

Arranca el servidor:

```bash
npm run dev
```

Abre **http://localhost:3000**.

Para validar antes de publicar:

```bash
npm run typecheck
npm run lint
npm run build
```

Para ejecutar la compilación:

```bash
npm run start
```

## Variables de entorno

Contenido del archivo `.env.example`:

```dotenv
NEXT_PUBLIC_APP_NAME=Ritmo
```

La variable es **opcional y pública**, está documentada como ejemplo de configuración. La app no requiere claves de API ni credenciales. `.env.local` está incluido en `.gitignore` y no debe subirse al repositorio.

## API

`GET /api/recomendacion?prioridad=alta` devuelve, por ejemplo:

```json
{
  "title": "Empieza por lo esencial",
  "message": "Dedica un bloque sin interrupciones a tu tarea de mayor impacto. Divide el trabajo en una acción de menos de 30 minutos.",
  "minutes": 25,
  "priority": "alta"
}
```

Una prioridad diferente de `alta`, `media` o `baja` devuelve **HTTP 400** con un mensaje de error. Esta API aplica reglas explícitas en el servidor; **no** realiza peticiones a una IA ni envía tareas personales.

## Arquitectura

```text
src/
├── app/
│   ├── page.tsx                    # Inicio (Server Component)
│   ├── tareas/page.tsx             # Ruta de tareas
│   ├── estadisticas/page.tsx       # Ruta de métricas
│   ├── guia/page.tsx               # Ruta de ayuda
│   ├── api/recomendacion/route.ts  # API interna
│   ├── loading.tsx                 # UI de carga de navegación
│   ├── error.tsx                   # UI de error de navegación
│   └── globals.css
├── components/
│   ├── home-dashboard.tsx
│   ├── task-workspace.tsx
│   ├── stats-dashboard.tsx
│   ├── recommendation-widget.tsx
│   ├── site-nav.tsx
│   └── ui.module.css
├── hooks/use-tasks.ts              # useState + useEffect + persistencia
└── lib/
    ├── tasks.ts
    └── recommendations.ts
```

## Despliegue en Vercel

1. Publica este código en un **repositorio público nuevo de GitHub**, incluyendo su historial de commits.
2. Entra a **https://vercel.com/new** usando tu cuenta actual.
3. Importa el repositorio, deja **Framework Preset: Next.js**, directorio raíz `./` y los valores predeterminados.
4. No necesitas Supabase, AWS, ni claves de API para esta aplicación.
5. Presiona **Deploy** y verifica las rutas `/`, `/tareas`, `/estadisticas`, `/guia` y `/api/recomendacion?prioridad=alta`.
6. Copia el dominio público de Vercel en la línea «URL de producción» al principio de este README y haz commit de esa edición.

## Proceso de Vibe Coding

Consulta [VIBE_CODING.md](./VIBE_CODING.md): instrucciones/prompts de desarrollo, iteraciones documentadas, decisiones, problemas y validaciones pendientes.

## Limitaciones conocidas

- Las tareas se almacenan **solo en el navegador actual**; no se sincronizan entre equipos. El navegador puede borrar sus datos.
- La API usa reglas, no modelos de IA: el **Vibe Coding** se aplica al proceso de *desarrollo*, no a la generación dinámica de recomendaciones.
- En esta entrega base se incluyen 3 tareas de ejemplo la primera vez que se abre el sitio. Puedes eliminarlas.

## Licencia y propósito

Proyecto demostrativo con fines educativos. No solicita datos privados ni pagos.
