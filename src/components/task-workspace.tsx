"use client";
import { FormEvent, useMemo, useState } from "react";
import { useTasks } from "@/hooks/use-tasks";
import { Category, Priority } from "@/lib/tasks";
import s from "@/components/ui.module.css";

type Filter = "todas" | "pendientes" | "completadas";
export function TaskWorkspace() {
  const { tasks, ready, add, toggle, remove } = useTasks();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("Estudio");
  const [priority, setPriority] = useState<Priority>("media");
  const [filter, setFilter] = useState<Filter>("todas");
  const [search, setSearch] = useState("");
  const shown = useMemo(() => tasks.filter((t) =>
    (filter === "todas" || (filter === "completadas" ? t.completed : !t.completed)) &&
    t.title.toLocaleLowerCase("es").includes(search.toLocaleLowerCase("es").trim())
  ), [tasks, filter, search]);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (add(title, category, priority)) setTitle("");
  }
  return <>
    <section className={s.card} aria-label="Crear nueva tarea">
      <form className={s.formGrid} onSubmit={submit}>
        <div><label className={s.label} htmlFor="task-title">Nueva tarea</label>
          <input className={s.input} id="task-title" value={title} onChange={(e)=>setTitle(e.target.value)} maxLength={120} minLength={2} required placeholder="Ej. Repasar TypeScript" /></div>
        <div><label className={s.label} htmlFor="task-category">Categoría</label>
          <select id="task-category" className={s.select} value={category} onChange={(e)=>setCategory(e.target.value as Category)}>
            <option>Estudio</option><option>Trabajo</option><option>Personal</option></select></div>
        <div><label className={s.label} htmlFor="task-priority">Prioridad</label>
          <select id="task-priority" className={s.select} value={priority} onChange={(e)=>setPriority(e.target.value as Priority)}>
            <option value="alta">Alta</option><option value="media">Media</option><option value="baja">Baja</option></select></div>
        <button className={s.btn} type="submit" disabled={!ready || title.trim().length < 2}>+ Añadir</button>
      </form>
    </section>
    <section style={{marginTop:25}} aria-label="Lista de tareas">
      <div className={s.sectionHead}><div><h2 className={s.sectionTitle}>Tu lista de tareas</h2><p className={s.sectionSub}>{ready ? `${tasks.length} tareas guardadas en este navegador` : "Cargando tus tareas..."}</p></div>
        <input className={s.input} aria-label="Buscar tareas" placeholder="Buscar tarea..." style={{maxWidth:240}} value={search} onChange={(e)=>setSearch(e.target.value)} />
      </div>
      <div className={s.filterRow} style={{marginBottom:18}}>
        {(["todas","pendientes","completadas"] as const).map((item)=><button type="button" key={item} onClick={()=>setFilter(item)} aria-pressed={filter===item} className={`${s.filterButton} ${filter===item?s.filterActive:""}`}>{item.charAt(0).toUpperCase()+item.slice(1)}</button>)}
      </div>
      {!ready ? <div className={s.skeleton} aria-label="Cargando tareas" /> : shown.length ? <ul className={s.taskList}>{shown.map((t)=><li key={t.id} className={s.taskRow}>
        <input className={s.checkbox} type="checkbox" aria-label={`Marcar ${t.title} como ${t.completed ? "pendiente" : "completada"}`} checked={t.completed} onChange={()=>toggle(t.id)} />
        <div className={s.taskMain}><div className={`${s.taskName} ${t.completed?s.taskDone:""}`}>{t.title}</div><div className={s.taskMeta}>{t.category} · {t.completed?"Completada":"Pendiente"}</div></div>
        <span className={`${s.pill} ${t.priority==="alta"?s.pillHigh:t.priority==="media"?s.pillMedium:s.pillLow}`}>{t.priority}</span>
        <button type="button" className={`${s.btn} ${s.btnDanger} ${s.btnSmall}`} onClick={()=>remove(t.id)} aria-label={`Eliminar ${t.title}`}>Eliminar</button>
      </li>)}</ul> : <div className={s.empty}><div className={s.emptyIcon}>✓</div>No hay tareas que coincidan con tu búsqueda.<br />Puedes agregar una arriba o cambiar el filtro.</div>}
    </section>
  </>;
}
