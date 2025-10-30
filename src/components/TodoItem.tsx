import { Check, Trash2 } from "lucide-react";
import type { Todo } from "../api/todos";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number, done: boolean) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 hover:shadow-md transition-all group">
      <div className="flex items-center gap-4">
        {/* Custom Checkbox */}
        <button
          onClick={() => onToggle(todo.id, !todo.done)}
          className={`w-6 h-6 rounded-full border-2 border-slate-800 hover:border-slate-900 hover:border-[3px] flex items-center justify-center transition-all flex-shrink-0 ${todo.done
              ? "bg-green-500"
              : "bg-white hover:bg-slate-50"
            }`}
          aria-label={todo.done ? "Đánh dấu chưa hoàn thành" : "Đánh dấu hoàn thành"}
        >
          {todo.done && <Check size={14} className="text-white" />}
        </button>
        {/* Todo Title */}
        <span
          className={`flex-1 transition-all break-words ${todo.done
              ? "line-through text-slate-400"
              : "text-slate-700"
            }`}
        >
          {todo.title}
        </span>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(todo.id)}
          className="text-slate-800 hover:text-red-500 transition-colors"
          aria-label="Xóa công việc"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}