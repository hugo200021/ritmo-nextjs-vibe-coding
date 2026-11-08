import type { Priority } from "@/lib/tasks";
export type Recommendation = { title: string; message: string; minutes: number; priority: Priority };
const rules: Record<Priority, Omit<Recommendation,"priority">> = {
  alta: { title: "Empieza por lo esencial", message: "Dedica un bloque sin interrupciones a tu tarea de mayor impacto. Divide el trabajo en una acción de menos de 30 minutos.", minutes: 25 },
  media: { title: "Construye constancia", message: "Elige un paso concreto, elimina las distracciones y completa un bloque de trabajo antes de cambiar de actividad.", minutes: 20 },
  baja: { title: "Aprovecha el impulso", message: "Resuelve una tarea pequeña para despejar tu lista y conservar energía para lo que venga después.", minutes: 15 },
};
export function getRecommendation(priority: Priority): Recommendation { return {...rules[priority], priority}; }
