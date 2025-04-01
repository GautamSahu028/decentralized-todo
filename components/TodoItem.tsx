import React, { useState } from "react";
import { useTodo } from "../context/TodoContext";
import { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { completeTodo, deleteTodo, editTodo, transactionPending } = useTodo();
  const [editing, setEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo.content);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleComplete = async (): Promise<void> => {
    await completeTodo(todo.id);
  };

  const handleDelete = async (): Promise<void> => {
    setIsDeleting(true);
    await deleteTodo(todo.id);
    setIsDeleting(false);
  };

  const handleEdit = async (): Promise<void> => {
    if (editing && editText !== todo.content) {
      await editTodo(todo.id, editText);
    }
    setEditing(!editing);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  return (
    <div
      className={`p-4 mb-4 border rounded-lg shadow-sm transition-all ${
        todo.completed ? "bg-gray-100" : "bg-white"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleComplete}
            disabled={transactionPending || todo.completed}
            className="mt-1 h-5 w-5 text-blue-600 rounded cursor-pointer"
          />
          <div className="flex-1">
            {editing ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full p-1 border rounded"
                autoFocus
              />
            ) : (
              <p
                className={`text-lg ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.content}
              </p>
            )}
            <div className="mt-1 text-xs text-gray-500 flex space-x-4">
              <span>Created: {formatDate(todo.createdAt)}</span>
              {todo.updatedAt > todo.createdAt && (
                <span>Updated: {formatDate(todo.updatedAt)}</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex space-x-2 ml-2">
          {!todo.completed && (
            <button
              onClick={handleEdit}
              disabled={transactionPending}
              className="text-blue-600 hover:text-blue-800 disabled:text-gray-400"
            >
              {editing ? "Save" : "Edit"}
            </button>
          )}
          <button
            onClick={handleDelete}
            disabled={transactionPending || isDeleting}
            className="text-red-600 hover:text-red-800 disabled:text-gray-400"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
