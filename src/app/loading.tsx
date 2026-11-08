import s from "@/components/ui.module.css";
export default function Loading() {
 return <section role="status" aria-label="Cargando página">
   <p className={s.eyebrow}>Preparando tu espacio...</p>
   <h1 className={s.sectionTitle} style={{marginBottom:25}}>Un momento, estamos organizando todo.</h1>
   <div className={s.grid3}><div className={s.skeleton}/><div className={s.skeleton}/><div className={s.skeleton}/></div>
 </section>;
}
