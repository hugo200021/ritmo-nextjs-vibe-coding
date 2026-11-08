import type { Metadata } from "next";
import { StatsDashboard } from "@/components/stats-dashboard";
import s from "@/components/ui.module.css";
export const metadata: Metadata = { title: "Estadísticas" };
export default function StatisticsPage() {
 return <><div className={s.eyebrow}>03 / Tu progreso</div><h1 className={s.heroTitle} style={{fontSize:"clamp(2.4rem,5vw,4rem)"}}>Mide lo que <em>importa.</em></h1>
  <p className={s.lead} style={{marginBottom:35}}>Consulta tu avance general y descubre dónde estás concentrando tus esfuerzos.</p>
  <StatsDashboard/>
 </>;
}
