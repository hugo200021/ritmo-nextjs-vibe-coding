import type { Metadata } from "next";
import { TaskWorkspace } from "@/components/task-workspace";
import s from "@/components/ui.module.css";
export const metadata: Metadata = { title: "Mis tareas" };
export default function TasksPage() {
  return <><div className={s.eyebrow}>02 / Organización</div><h1 className={s.heroTitle} style={{fontSize:"clamp(2.4rem,5vw,4rem)"}}>Haz espacio para <em>avanzar.</em></h1>
    <p className={s.lead} style={{marginBottom:35}}>Crea, filtra y completa tareas. Tus cambios se guardan localmente, sin registrarte ni compartir información personal.</p>
    <TaskWorkspace />
  </>;
}
