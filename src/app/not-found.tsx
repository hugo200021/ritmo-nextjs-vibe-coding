import Link from "next/link";
import s from "@/components/ui.module.css";
export default function NotFound() {
 return <section className={s.card} style={{maxWidth:650,margin:"65px auto",textAlign:"center"}}>
   <div className={s.eyebrow}>Error 404</div><h1 className={s.sectionTitle} style={{fontSize:"2.1rem",margin:"15px 0"}}>Esta página no existe.</h1>
   <p className={s.stepText} style={{marginBottom:22}}>La dirección puede estar equivocada o haber cambiado.</p><Link href="/" className={s.btn}>Volver al inicio ↗</Link>
 </section>;
}
