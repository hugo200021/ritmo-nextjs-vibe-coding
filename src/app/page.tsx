import Link from "next/link";
import s from "@/components/ui.module.css";
export default function Home() {
 return <>
  <section><div className={s.eyebrow}>✦ Tu espacio de productividad</div>
   <h1 className={s.heroTitle}>Cada tarea cuenta.<br /><em>Cada avance también.</em></h1>
   <p className={s.lead}>Organiza lo importante y convierte tus objetivos en avances concretos.</p>
   <div className={s.heroRow}><Link className={s.btn} href="/tareas">Empezar ahora ↗</Link></div>
  </section>
 </>;
}
