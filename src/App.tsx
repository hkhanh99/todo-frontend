import { useState } from "react";
import { Check } from "lucide-react";
import TodoItem from "./components/TodoItem";
import TodoInput from "./components/TodoInput";
import type { Todo } from "./api/todos";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      done: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const handleToggle = (id: number, done: boolean) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, done } : todo
    ));
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(t => t.done).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="w-full max-w-2xl mx-auto pt-8">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-light text-slate-800 mb-3 tracking-tight">
            Todo List
          </h1>
          <p className="text-slate-500 text-base">
            {todos.length > 0 
              ? `${completedCount} / ${todos.length} công việc hoàn thành` 
              : 'Bắt đầu thêm công việc của bạn'
            }
          </p>
        </div>

        {/* Input Component */}
        <div className="mb-8">
          <TodoInput onAdd={handleAdd} />
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <Check size={40} className="text-slate-300" strokeWidth={2} />
              </div>
              <p className="text-slate-400 text-base">Chưa có công việc nào</p>
              <p className="text-slate-300 text-sm mt-2">Thêm công việc đầu tiên để bắt đầu</p>
            </div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;