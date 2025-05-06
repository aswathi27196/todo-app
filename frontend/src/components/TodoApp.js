import React, { useEffect, useState } from 'react';
import AddTodo from './AddTodo';
import Filter from './Filter';
import TodoList from './TodoList';

export default function TodoApp() {

    const [todos, setTodos] = useState([])
    const [filter, setFilter] = useState('all');
    
    const API_URL = 'https://dummyjson.com/todos';
    const LOCAL_STORAGE_KEY = 'todoApp.tasks';

    // Load from localStorage or API
    useEffect(() => {
        const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    
        try {
          const parsed = JSON.parse(storedTodos);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setTodos(parsed); // Load from localStorage
          } else {
            throw new Error('Invalid localStorage data');
          }
        } catch {
            fetch(API_URL)
                .then((res) => res.json())
                .then((data) => {
                    const formatted = data.todos.map((todo) => ({
                        id: todo.id,
                        text: todo.todo,
                        completed: todo.completed,
                    }));
                    setTodos(formatted);
                    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formatted));
                })
                .catch((err) => console.error('API fetch error:', err));
        }
      }, []);

    // Persist to localStorage on change
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text) => {
        const newTodo = {
            id: Date.now(),
            text,
            completed: false,
        };
        setTodos([newTodo, ...todos]);
    };

    const toggleComplete = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'pending') return !todo.completed;
        return true;
    });

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">React To-Do List</h2>
            <AddTodo addTodo={addTodo} />
            <Filter filter={filter} setFilter={setFilter} />
            <TodoList
                todos={filteredTodos}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
            />
        </div>
    );
}