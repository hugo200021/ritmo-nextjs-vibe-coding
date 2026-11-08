import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import s from "@/components/ui.module.css";

export const metadata: Metadata = {
  title: { default: "Ritmo — Organiza tu progreso", template: "%s | Ritmo" },
  description: "Organiza tareas, visualiza tu progreso y recibe consejos para estudiar con enfoque.",
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>
    <header className={s.header}><div className={`${s.shell} ${s.headerInner}`}>
      <Link href="/" className={s.brand} aria-label="Ritmo, ir al inicio"><span className={s.brandMark}>↗</span> Ritmo<span style={{ color: "var(--mint)" }}>.</span></Link>
      <SiteNav />
      <span className={s.headerBadge}>✦ Hecho con Next.js 16</span>
    </div></header>
    <main className={`${s.shell} ${s.main}`}>{children}</main>
    <footer className={s.footer}><div className={`${s.shell} ${s.footerInner}`}>
      <span>© {new Date().getFullYear()} Ritmo · Proyecto académico de Vibe Coding</span>
      <span>Sin registro · Tus tareas permanecen en este navegador</span>
    </div></footer>
  </body></html>;
}
