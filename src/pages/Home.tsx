import { useEffect, useState } from "react";
import { type Todo, getTodos, addTodo, updateTodo, deleteTodo } from "../api/todos";
import TodoInput from "../components/TodoInput";
import TodoItem from "../components/TodoItem";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const loadTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch {
      alert("Không thể tải danh sách todo.");
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAdd = async (title: string) => {
    try {
      const newTodo = await addTodo(title);
      setTodos([...todos, newTodo]);
    } catch (err: any) {
      alert("Thêm thất bại: " + err.message);
    }
  };

  const handleToggle = async (id: number, done: boolean) => {
    const oldTodos = [...todos];
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done } : t))
    );
    try {
      await updateTodo(id, { done });
    } catch {
      alert("Toggle thất bại, rollback!");
      setTodos(oldTodos);
    }
  };

  const handleDelete = async (id: number) => {
    const oldTodos = [...todos];
    setTodos((prev) => prev.filter((t) => t.id !== id));
    try {
      await deleteTodo(id);
    } catch {
      alert("Xóa thất bại, rollback!");
      setTodos(oldTodos);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h1>Todo App</h1>
      <TodoInput onAdd={handleAdd} />
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
