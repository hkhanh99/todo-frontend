import { useState } from "react";
import { Plus } from "lucide-react";

interface TodoInputProps {
  onAdd: (title: string) => void;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (title.trim() === "") {
      alert("Tiêu đề không được rỗng");
      return;
    }
    if (title.length > 140) {
      alert("Tiêu đề không được vượt quá 140 ký tự");
      return;
    }
    onAdd(title);
    setTitle("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
      <div className="flex items-center gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Thêm công việc mới..."
          className="flex-1 border-0 border-b-2 border-slate-200 px-3 py-3 focus:outline-none focus:border-slate-800 transition-colors text-slate-700 placeholder:text-slate-400 bg-transparent"
          maxLength={140}
        />
        <button
          onClick={handleSubmit}
          className="bg-slate-800 text-white p-3 rounded-xl hover:bg-slate-900 transition-all hover:shadow-md active:scale-95 min-w-[48px] min-h-[48px] flex items-center justify-center"
          aria-label="Thêm công việc"
        >
          <Plus size={22} strokeWidth={2.5} />
        </button>
      </div>
      
      {/* Character counter */}
      <div className="text-right mt-3">
        <span className={`text-xs font-medium ${title.length > 140 ? 'text-red-500' : 'text-slate-400'}`}>
          {title.length}/140
        </span>
      </div>
    </div>
  );
}