"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import s from "@/components/ui.module.css";
const nav = [
  { href: "/", label: "Inicio" },
  { href: "/tareas", label: "Mis tareas" },
  { href: "/estadisticas", label: "Estadísticas" },
  { href: "/guia", label: "Guía" },
];
export function SiteNav() {
  const path = usePathname();
  return <nav className={s.nav} aria-label="Navegación principal">
    {nav.map((item) => <Link key={item.href} href={item.href}
      className={`${s.navLink} ${path === item.href ? s.navActive : ""}`}
      aria-current={path === item.href ? "page" : undefined}>{item.label}</Link>)}
  </nav>;
}
