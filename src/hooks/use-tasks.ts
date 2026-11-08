"use client";
import { useCallback, useSyncExternalStore } from "react";
import { Category, Priority, STORAGE_KEY, Task, initialTasks, validTask } from "@/lib/tasks";

const EVENT_NAME = "ritmo:tasks-changed";
const EMPTY_TASKS: Task[] = [];
let cachedTasks: Task[] | null = null;

function readStorage(): Task[] {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      const parsed: unknown = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed.filter(validTask) : [];
    }
    const demo = initialTasks();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(demo));
    return demo;
  } catch { return EMPTY_TASKS; }
}
function getSnapshot(): Task[] {
  if (cachedTasks === null) cachedTasks = readStorage();
  return cachedTasks;
}
function getServerSnapshot(): Task[] { return EMPTY_TASKS; }
function subscribe(notify: () => void): () => void {
  const onSameTabChange = () => notify();
  const onStorageChange = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) {
      cachedTasks = readStorage();
      notify();
    }
  };
  window.addEventListener(EVENT_NAME, onSameTabChange);
  window.addEventListener("storage", onStorageChange);
  return () => {
    window.removeEventListener(EVENT_NAME, onSameTabChange);
    window.removeEventListener("storage", onStorageChange);
  };
}
function noopSubscribe(): () => void { return () => {}; }
function isClient(): boolean { return true; }
function isServer(): boolean { return false; }
function mutate(fn: (prev: Task[]) => Task[]) {
  // React external-store snapshots are immutable; persist outside of render/updater functions.
  cachedTasks = fn(getSnapshot());
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cachedTasks)); }
  catch { /* Privacidad del navegador puede impedir persistir; la UI sigue funcionando. */ }
  window.dispatchEvent(new Event(EVENT_NAME));
}
export function useTasks() {
  const tasks = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = useSyncExternalStore(noopSubscribe, isClient, isServer);
  const add = useCallback((title: string, category: Category, priority: Priority) => {
    const cleaned = title.trim().slice(0, 120);
    if (cleaned.length < 2) return false;
    mutate((prev) => [{ id: crypto.randomUUID(), title: cleaned, category, priority, completed: false, createdAt: new Date().toISOString() }, ...prev]);
    return true;
  }, []);
  const toggle = useCallback((id: string) => mutate((prev) => prev.map((t) => t.id === id ? { ...t, completed: !t.completed } : t)), []);
  const remove = useCallback((id: string) => mutate((prev) => prev.filter((t) => t.id !== id)), []);
  return { tasks, ready, add, toggle, remove };
}
