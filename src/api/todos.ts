import { apiFetch } from "./client";

export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

export async function getTodos(): Promise<Todo[]> {
  return apiFetch("/todos");
}
// // Temporary mock
// export async function getTodos() {
//   return [
//     { id: 1, title: "Test Todo 1", done: false },
//     { id: 2, title: "Test Todo 2", done: true },
//   ];
// }

export async function addTodo(title: string): Promise<Todo> {
  return apiFetch("/todos", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
}

export async function updateTodo(id: number, data: Partial<Todo>): Promise<Todo> {
  return apiFetch(`/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteTodo(id: number): Promise<void> {
  return apiFetch(`/todos/${id}`, { method: "DELETE" });
}
