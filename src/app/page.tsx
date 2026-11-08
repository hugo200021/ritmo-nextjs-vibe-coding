import Link from "next/link";
import { HomeDashboard } from "@/components/home-dashboard";
import s from "@/components/ui.module.css";
export default function Home() {
 return <>
  <section><div className={s.eyebrow}>✦ Tu espacio de productividad</div>
   <h1 className={s.heroTitle}>Cada tarea cuenta.<br /><em>Cada avance también.</em></h1>
   <p className={s.lead}>Organiza lo importante, visualiza tus avances y encuentra tu siguiente paso. Sin cuentas, sin complicaciones.</p>
   <div className={s.heroRow}><Link className={s.btn} href="/tareas">Organizar mis tareas ↗</Link><Link className={`${s.btn} ${s.btnSecondary}`} href="/guia">Cómo funciona</Link></div>
  </section>
  <HomeDashboard/>
 </>;
}
