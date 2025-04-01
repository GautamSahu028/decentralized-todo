import React from "react";
import { useTodo } from "../context/TodoContext";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";

export default function TodoList() {
  const { todos, loading, error, refreshTodos } = useTodo();

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  if (loading) {
    return (
      <div className="flex justify-center my-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded-lg mb-6">
          {error}
          <button onClick={refreshTodos} className="ml-2 underline">
            Try again
          </button>
        </div>
      )}

      <AddTodo />

      {todos.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No todos yet. Add your first task above!
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">
              Active Tasks ({activeTodos.length})
            </h2>
            {activeTodos.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                All tasks completed! 🎉
              </p>
            ) : (
              activeTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
            )}
          </div>

          {completedTodos.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">
                Completed Tasks ({completedTodos.length})
              </h2>
              {completedTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
