"use client";
import Link from "next/link";
import { useMemo } from "react";
import { useTasks } from "@/hooks/use-tasks";
import { completionRate, Priority } from "@/lib/tasks";
import { RecommendationWidget } from "@/components/recommendation-widget";
import s from "@/components/ui.module.css";
const levels: Record<Priority,number>={alta:3,media:2,baja:1};
export function HomeDashboard() {
 const {tasks,ready,toggle}=useTasks();
 const done=tasks.filter((t)=>t.completed).length;
 const pending=useMemo(()=>tasks.filter((t)=>!t.completed).sort((a,b)=>levels[b.priority]-levels[a.priority]),[tasks]);
 const priority:Priority = pending[0]?.priority??"media";
 return <><div className={s.grid3}>
   <section className={s.card}><div className={s.statBadge}>◈ Todas</div><div className={s.statNumber}>{ready?tasks.length:"—"}</div><div className={s.statLabel}>Tareas registradas</div></section>
   <section className={s.card}><div className={s.statBadge}>◇ Pendientes</div><div className={s.statNumber}>{ready?pending.length:"—"}</div><div className={s.statLabel}>Por completar</div></section>
   <section className={s.card}><div className={s.statBadge}>✓ Terminadas</div><div className={s.statNumber}>{ready?`${completionRate(tasks)}%`:"—"}</div><div className={s.statLabel}>{done} tareas completadas</div></section>
 </div>
 <div className={s.grid2} style={{marginTop:16}}>
  <section className={s.card}>
   <div className={s.sectionHead}><div><h2 className={s.sectionTitle}>Próximos pendientes</h2><p className={s.sectionSub}>Elige una tarea y continúa.</p></div><Link href="/tareas" className={`${s.btn} ${s.btnSecondary} ${s.btnSmall}`}>Ver todas ↗</Link></div>
   {!ready ? <div className={s.skeleton} aria-label="Cargando tareas"/> : pending.length ? <ul className={s.taskList}>
     {pending.slice(0,3).map((task)=><li key={task.id} className={s.taskRow}><input className={s.checkbox} type="checkbox" checked={task.completed} aria-label={`Completar ${task.title}`} onChange={()=>toggle(task.id)}/><div className={s.taskMain}><div className={s.taskName}>{task.title}</div><div className={s.taskMeta}>{task.category} · Prioridad {task.priority}</div></div></li>)}
   </ul> : <div className={s.empty}>¡Muy bien! No tienes tareas pendientes.</div>}
  </section>
  <RecommendationWidget priority={priority}/>
 </div></>;
}
