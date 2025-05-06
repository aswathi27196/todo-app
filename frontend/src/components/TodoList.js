import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({todos, toggleComplete, deleteTodo }) {

    if (!Array.isArray(todos)) {
        console.error('Expected todos to be an array, got:', todos);
        return <p className="text-danger">Error: Task list is corrupted.</p>;
    }

    if (todos.length === 0) {
        return <p className="text-center text-muted">No tasks found.</p>;
    }
    
    return (
        <ul className="list-group">
            {todos.map((todo) => (
            <TodoItem
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
            />
            ))}
        </ul>
    );
}