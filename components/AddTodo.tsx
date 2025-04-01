import React, { useState } from "react";
import { useTodo } from "../context/TodoContext";

export default function AddTodo() {
  const [content, setContent] = useState<string>("");
  const { createTodo, transactionPending } = useTodo();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!content.trim()) return;

    const success = await createTodo(content);
    if (success) {
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Add a new task..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={transactionPending}
          className="flex-1 p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={!content.trim() || transactionPending}
          className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {transactionPending ? "Adding..." : "Add"}
        </button>
      </div>
    </form>
  );
}
