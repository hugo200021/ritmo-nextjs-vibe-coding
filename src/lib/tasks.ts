export type Priority = "alta" | "media" | "baja";
export type Category = "Estudio" | "Trabajo" | "Personal";
export type Task = {
  id: string;
  title: string;
  priority: Priority;
  category: Category;
  completed: boolean;
  createdAt: string;
};
export const categories: Category[] = ["Estudio", "Trabajo", "Personal"];
export const priorities: Priority[] = ["alta", "media", "baja"];
export const STORAGE_KEY = "ritmo-tasks-v1";
export function initialTasks(): Task[] {
  const now = new Date().toISOString();
  return [
    { id: crypto.randomUUID(), title: "Definir objetivos de la semana", priority: "alta", category: "Estudio", completed: false, createdAt: now },
    { id: crypto.randomUUID(), title: "Organizar pendientes importantes", priority: "media", category: "Trabajo", completed: false, createdAt: now },
    { id: crypto.randomUUID(), title: "Reservar tiempo de descanso", priority: "baja", category: "Personal", completed: true, createdAt: now },
  ];
}
export function validTask(value: unknown): value is Task {
  if (!value || typeof value !== "object") return false;
  const t = value as Record<string, unknown>;
  return typeof t.id === "string" && typeof t.title === "string" &&
    priorities.includes(t.priority as Priority) && categories.includes(t.category as Category) &&
    typeof t.completed === "boolean" && typeof t.createdAt === "string";
}
export function completionRate(tasks: Task[]): number {
  if (!tasks.length) return 0;
  return Math.round(tasks.filter((task) => task.completed).length * 100 / tasks.length);
}
