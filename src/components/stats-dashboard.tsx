"use client";
import Link from "next/link";
import { useTasks } from "@/hooks/use-tasks";
import { categories, completionRate } from "@/lib/tasks";
import s from "@/components/ui.module.css";
export function StatsDashboard() {
 const { tasks,ready }=useTasks();
 const total=tasks.length, completed=tasks.filter((task)=>task.completed).length;
 const rate=completionRate(tasks);
 return <>
  <div className={s.grid3}>
   <div className={s.card}><span className={s.kicker}>Total</span><div className={s.statNumber}>{ready?total:"—"}</div><p className={s.statLabel}>Tareas registradas</p></div>
   <div className={s.card}><span className={s.kicker}>Finalizadas</span><div className={s.statNumber}>{ready?completed:"—"}</div><p className={s.statLabel}>Tareas completadas</p></div>
   <div className={`${s.card} ${s.cardFeature}`}><span className={s.kicker}>Efectividad</span><div className={s.statNumber}>{ready?`${rate}%`:"—"}</div><p className={s.statLabel}>Progreso global</p></div>
  </div>
  <div className={s.grid2} style={{marginTop:17}}>
   <section className={s.card}><h2 className={s.sectionTitle}>Progreso general</h2><p className={s.sectionSub}>Completadas respecto al total de tareas.</p>
    <div className={s.progressLabels} style={{marginTop:32}}><strong>{completed} de {total}</strong><span>{rate}%</span></div>
    <div className={s.progressOuter} role="progressbar" aria-label="Progreso de tareas" aria-valuenow={rate} aria-valuemin={0} aria-valuemax={100}><div className={s.progressInner} style={{width:`${rate}%`}}/></div>
    <p className={s.sectionSub} style={{marginTop:22}}>{total===0?"Agrega tareas para comenzar a medir tu progreso.":rate===100?"¡Todas tus tareas están completas!":"Cada tarea finalizada acerca tus objetivos."}</p>
   </section>
   <section className={s.card}><h2 className={s.sectionTitle}>Por categoría</h2><p className={s.sectionSub}>Distribución de tus actividades.</p>
    {categories.map((category)=>{
      const list=tasks.filter((task)=>task.category===category);
      const categoryRate=completionRate(list);
      return <div className={s.topicRow} key={category}>
       <div className={s.progressLabels}><strong>{category}</strong><span>{list.filter((t)=>t.completed).length} / {list.length}</span></div>
       <div className={s.progressOuter} role="progressbar" aria-label={`Progreso ${category}`} aria-valuenow={categoryRate} aria-valuemin={0} aria-valuemax={100}><div className={s.progressInner} style={{width:`${categoryRate}%`}}/></div>
      </div>;
    })}
   </section>
  </div>
  <div className={s.heroRow}><Link href="/tareas" className={s.btn}>Gestionar tareas ↗</Link></div>
 </>;
}
