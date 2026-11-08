import type { Metadata } from "next";
import Link from "next/link";
import s from "@/components/ui.module.css";
export const metadata: Metadata = { title: "Guía de uso" };
const steps = [
  { title:"Captura tus objetivos", text:"En Mis tareas, escribe un pendiente concreto, asígnale categoría y prioridad y pulsa Añadir." },
  { title:"Elige un siguiente paso", text:"En Inicio, Ritmo consulta una API propia de Next.js para sugerir cómo enfocar tu sesión." },
  { title:"Marca tus avances", text:"Completa las tareas realizadas. Puedes filtrarlas, buscarlas o eliminarlas cuando ya no las necesites." },
  { title:"Revisa tu progreso", text:"En Estadísticas encontrarás el porcentaje de cumplimiento y el avance por categoría." },
];
export default function GuidePage() {
 return <><div className={s.eyebrow}>04 / Manual rápido</div><h1 className={s.heroTitle} style={{fontSize:"clamp(2.4rem,5vw,4rem)"}}>Un sistema simple.<br /><em>Progreso real.</em></h1>
  <p className={s.lead} style={{marginBottom:36}}>Ritmo funciona sin cuenta y sin contraseñas. Empieza con estas cuatro acciones.</p>
  <div className={s.grid2}>
    <section className={s.card}><h2 className={s.sectionTitle}>Cómo funciona</h2><div className={s.steps} style={{marginTop:27}}>{steps.map((step,i)=><div className={s.step} key={step.title}><span className={s.stepNo}>{i+1}</span><div><h3 className={s.stepTitle}>{step.title}</h3><p className={s.stepText}>{step.text}</p></div></div>)}</div></section>
    <section className={`${s.card} ${s.cardFeature}`}><div className={s.eyebrow}>Sobre el proyecto</div><h2 className={s.sectionTitle} style={{marginTop:15}}>Construido con Vibe Coding</h2><p className={s.stepText}>Esta aplicación demuestra una metodología de desarrollo con IA: definición de requisitos, creación de páginas y componentes, iteración, revisión del código y despliegue.</p>
      <div className={s.note} style={{marginTop:22}}>Tecnologías: Next.js 16, App Router, TypeScript, CSS Modules, Route Handlers y React Hooks.</div>
      <p className={s.stepText} style={{marginTop:20}}>Privacidad: tus tareas se almacenan en el <strong>localStorage</strong> de este navegador. No se sincronizan entre dispositivos; si borras sus datos, las perderás. La API de recomendaciones recibe solamente la prioridad de la tarea.</p>
      <div className={s.heroRow}><Link href="/tareas" className={s.btn}>Crear mi primera tarea ↗</Link></div>
    </section>
  </div>
 </>;
}
