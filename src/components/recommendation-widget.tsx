"use client";
import { useEffect, useState } from "react";
import type { Priority } from "@/lib/tasks";
import type { Recommendation } from "@/lib/recommendations";
import s from "@/components/ui.module.css";
export function RecommendationWidget({ priority }: { priority: Priority }) {
  const [result, setResult] = useState<Recommendation|null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    async function fetchRecommendation() {
      setLoading(true); setError(""); setResult(null);
      try {
        const response = await fetch(`/api/recomendacion?prioridad=${priority}`, { signal:controller.signal, cache:"no-store" });
        if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
        const data = (await response.json()) as Recommendation;
        if (typeof data.title !== "string" || typeof data.minutes !== "number") throw new Error("Respuesta inválida");
        if (!controller.signal.aborted) setResult(data);
      } catch (e) { if (!controller.signal.aborted) setError(e instanceof Error?e.message:"No se pudo obtener la recomendación"); }
      finally { if (!controller.signal.aborted) setLoading(false); }
    }
    void fetchRecommendation();
    return ()=>controller.abort();
  }, [priority,retry]);
  return <section className={`${s.card} ${s.cardFeature}`} aria-live="polite">
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:10,flexWrap:"wrap"}}>
      <span className={s.kicker}>Tu siguiente sesión</span><span className={s.apiStatus}><span className={s.dot}/> API de Next.js</span>
    </div>
    {loading ? <div style={{marginTop:22}} className={s.skeleton} role="status" aria-label="Cargando recomendación" /> : error ? <div style={{marginTop:22}} className={s.notice} role="alert">No se pudo cargar el consejo: {error}.<div style={{marginTop:12}}><button type="button" className={`${s.btn} ${s.btnSmall}`} onClick={()=>setRetry((n)=>n+1)}>Reintentar</button></div></div> : result ? <>
      <div className={s.tipNumber}>{result.minutes} min</div><h3 style={{margin:"5px 0 10px",fontSize:"1.4rem",letterSpacing:"-.04em"}}>{result.title}</h3><p className={s.stepText}>{result.message}</p>
    </> : null}
  </section>;
}
