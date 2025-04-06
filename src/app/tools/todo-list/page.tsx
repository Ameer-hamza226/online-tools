'use client';

import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  priority: 'low' | 'medium' | 'high';
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [title, setTitle] = useState('My To-Do List');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo.trim(), priority }
      ]);
      setNewTodo('');
    }
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const printList = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const priorityColors = {
      high: '#ef4444',
      medium: '#f59e0b',
      low: '#10b981'
    };

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; margin-bottom: 20px; }
            .todo-item {
              padding: 10px;
              border-bottom: 1px solid #eee;
              display: flex;
              align-items: center;
            }
            .priority-dot {
              width: 12px;
              height: 12px;
              border-radius: 50%;
              margin-right: 10px;
            }
            .checkbox {
              width: 20px;
              height: 20px;
              border: 2px solid #333;
              margin-right: 10px;
            }
            @media print {
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          ${todos.map(todo => `
            <div class="todo-item">
              <div class="checkbox"></div>
              <div class="priority-dot" style="background-color: ${priorityColors[todo.priority]}"></div>
              <div>${todo.text}</div>
            </div>
          `).join('')}
          <script>
            window.onload = () => window.print();
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  const priorityClasses = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500'
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">To-Do List Generator</h1>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            List Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter list title..."
          />
        </div>

        <form onSubmit={addTodo} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Add New Task
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter a new task..."
              />
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Add
              </button>
            </div>
          </div>
        </form>

        <div className="space-y-2">
          {todos.map(todo => (
            <div
              key={todo.id}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${priorityClasses[todo.priority]}`} />
                <span>{todo.text}</span>
              </div>
              <button
                onClick={() => removeTodo(todo.id)}
                className="text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {todos.length > 0 && (
          <button
            onClick={printList}
            className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Print List
          </button>
        )}
      </div>
    </div>
  );
}
