# Bitácora de Vibe Coding — Ritmo

**Actividad:** Implementación de Aplicación Next.js mediante Vibe Coding: Flujo de Desarrollo Guiado por IA.

**Fecha de preparación:** 8 de noviembre de 2026.
**Herramienta de IA:** ChatGPT.
**Objetivo:** construir desde cero una aplicación de productividad en Next.js 16 con cuatro rutas, API interna, React Hooks, estados de carga y error, diseño responsive y documentación para GitHub/Vercel.

## 1. Inicio del proyecto y solicitud a la IA

La solicitud real del estudiante fue terminar rápidamente la tarea de Next.js con Vibe Coding, compartiendo íntegramente la rúbrica. La IA propuso un alcance sin dependencias externas de pago: **Ritmo**, gestor de tareas personales con datos en `localStorage` y recomendaciones calculadas por una API propia.

La siguiente es una **reformulación técnica de la consigna utilizada para orientar la solución**; no se presenta como una cita literal adicional del estudiante:

> Crear una aplicación profesional llamada Ritmo usando Next.js 16+, App Router y TypeScript. Incluir cuatro rutas, gestión de tareas con persistencia local, Server y Client Components, una API interna consumida con fetch, useState/useEffect, manejo de loading/error y estilo responsive con CSS Modules. Documentar el desarrollo iterativo y los pasos para Vercel.

## 2. Iteraciones desarrolladas con IA

Las etapas siguientes describen el trabajo generado durante esta sesión. El repositorio contiene commits separados para reflejar los incrementos; **el usuario debe revisar el código y ejecutar las comprobaciones antes de presentar la aplicación como verificada**.

| Iteración | Instrucción técnica / enfoque | Resultado | Commit |
| --- | --- | --- | --- |
| 1 | Preparar la estructura App Router con TypeScript y navegación | Configuración base, diseño, layout y portada | `chore: iniciar Next.js 16 con TypeScript y diseño base` |
| 2 | Agregar páginas funcionales con gestión local de tareas | Rutas, hooks y persistencia con `localStorage` | `feat: crear cuatro rutas y gestión local de tareas` |
| 3 | Conectar el frontend a un Route Handler y mostrar estadísticas | API JSON, `fetch`, `useEffect`, `useState`, visualización | `feat: integrar API interna de recomendaciones y estadísticas` |
| 4 | Prever lentitud, errores y pantallas pequeñas | `loading.tsx`, `error.tsx`, `not-found.tsx`, responsive | `fix: añadir loading UI, error UI y experiencia responsive` |
| 5 | Preparar documentación reproducible y despliegue | `README.md`, `.env.example`, esta bitácora | `docs: registrar el flujo de Vibe Coding y el despliegue` |

## 3. Decisiones técnicas

- **Next.js 16 + App Router:** satisface el framework y permite vistas de servidor y cliente.
- **TypeScript:** tipos explícitos para tarea, categoría, prioridad y respuesta API.
- **CSS Modules:** estilo encapsulado y adaptable sin librerías extra; evita instalar Tailwind para un alcance pequeño.
- **`localStorage`:** sin necesidad de pagar Supabase, AWS ni montar una base de datos. Los datos son locales, limitación informada en la interfaz.
- **API interna `GET /api/recomendacion`:** cumple integración cliente-servidor sin claves, costes ni proveedores externos.
- **Estado de interfaz:** `useState` y `useEffect` en componentes cliente, junto con `AbortController` para cancelar fetch al desmontar o cambiar prioridad.
- **Separación de responsabilidades:** `src/lib` para reglas y tipos, `src/hooks` para persistencia, `src/components` para UI y `src/app` para rutas.
- **Privacidad:** el API solo recibe la prioridad; no recibe nombres de tareas ni datos identificables.

## 4. Desafíos y soluciones

1. **Completar la rúbrica sin depender de cuentas ni pagos.** Se optó por Route Handler interno y almacenamiento en el navegador en lugar de usar API externas o Supabase.
2. **Combinar componentes de servidor y cliente correctamente.** Se mantuvieron `page.tsx` y `layout.tsx` como Server Components, y se usó `"use client"` solo donde hay hooks y eventos.
3. **Evitar discrepancias de hidratación al leer localStorage.** La carga inicial se realiza dentro de `useEffect`, después del montaje del componente.
4. **Prever errores de API y estados intermedios.** El widget usa `loading`, `error`, `AbortController` y reintento; existen además límites de error/carga a nivel de App Router.
5. **Separar requisitos de despliegue de requisitos de construcción.** El código no incorpora una URL ficticia; la URL de Vercel se añade únicamente cuando existe un despliegue público real.

## 5. Validación funcional a realizar

Antes de entregar, comprobar y marcar según evidencia real:

- [ ] `npm install` se completa sin errores.
- [ ] `npm run typecheck` termina sin errores.
- [ ] `npm run lint` termina sin errores.
- [ ] `npm run build` muestra compilación exitosa.
- [ ] Inicio `/` muestra métricas y recomendación desde la API.
- [ ] Mis tareas `/tareas` permite crear, completar, buscar y eliminar.
- [ ] Estadísticas `/estadisticas` refleja cambios del listado.
- [ ] Guía `/guia` se visualiza correctamente.
- [ ] `/api/recomendacion?prioridad=alta` devuelve HTTP 200 y JSON.
- [ ] `/api/recomendacion?prioridad=otra` devuelve HTTP 400.
- [ ] Vista móvil responsive.
- [ ] Repositorio público con commits descriptivos.
- [ ] Aplicación publicada y comprobada en Vercel.
- [ ] URL real de producción añadida al README.

> No marcar como ejecutadas verificaciones todavía pendientes. La publicación es un paso posterior a la generación de este proyecto.

## 6. Qué aportó la IA y qué debe controlar el estudiante

La IA propuso la arquitectura y generó los archivos y commits iniciales; el estudiante decide qué se publica, revisa requisitos, ejecuta las pruebas, corrige cualquier fallo que aparezca y despliega el repositorio. Esta división de responsabilidades es la esencia del Vibe Coding guiado.
