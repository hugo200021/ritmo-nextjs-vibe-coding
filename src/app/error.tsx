"use client";
import { useEffect } from "react";
import s from "@/components/ui.module.css";
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
 useEffect(()=>{ console.error("Error de página:",error); },[error]);
 return <section className={s.card} role="alert" style={{maxWidth:650,margin:"65px auto",textAlign:"center"}}>
   <div className={s.eyebrow}>Ocurrió un inconveniente</div><h1 className={s.sectionTitle} style={{fontSize:"2rem",margin:"15px 0"}}>No pudimos mostrar esta página.</h1>
   <p className={s.stepText} style={{marginBottom:22}}>Puedes intentar nuevamente. Tus tareas guardadas en el navegador permanecen intactas.</p>
   <button type="button" onClick={reset} className={s.btn}>Reintentar ↗</button>
 </section>;
}
