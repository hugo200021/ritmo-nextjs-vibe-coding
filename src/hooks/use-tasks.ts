"use client";
import { useCallback, useEffect, useState } from "react";
import { Category, Priority, STORAGE_KEY, Task, initialTasks, validTask } from "@/lib/tasks";
const EVENT_NAME = "ritmo:tasks-changed";
function load(): Task[] {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      const parsed: unknown = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed.filter(validTask);
    }
    const demo = initialTasks();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(demo));
    return demo;
  } catch { return []; }
}
function persist(next: Task[]) {
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* El almacenamiento puede estar deshabilitado. */ }
  window.dispatchEvent(new Event(EVENT_NAME));
}
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const sync = () => setTasks(load());
    sync();
    setReady(true);
    window.addEventListener("storage", sync);
    window.addEventListener(EVENT_NAME, sync);
    return () => { window.removeEventListener("storage", sync); window.removeEventListener(EVENT_NAME, sync); };
  }, []);
  const update = useCallback((fn: (prev: Task[]) => Task[]) => {
    setTasks((prev) => {
      const next = fn(prev);
      persist(next);
      return next;
    });
  }, []);
  const add = useCallback((title: string, category: Category, priority: Priority) => {
    const cleaned = title.trim().slice(0,120);
    if (!cleaned) return false;
    update((prev) => [{ id: crypto.randomUUID(), title: cleaned, category, priority, completed: false, createdAt: new Date().toISOString() }, ...prev]);
    return true;
  }, [update]);
  const toggle = useCallback((id: string) => update((prev) => prev.map((t) => t.id === id ? { ...t, completed: !t.completed } : t)), [update]);
  const remove = useCallback((id: string) => update((prev) => prev.filter((t) => t.id !== id)), [update]);
  return { tasks, ready, add, toggle, remove };
}
