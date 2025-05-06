import React from 'react';

export default function TodoItem({ todo, toggleComplete, deleteTodo }) {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <span
                onClick={() => toggleComplete(todo.id)}
                style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
                flex: 1
                }}
            >
            {todo.text}
            </span>
          <button className="btn btn-sm btn-danger ms-2" onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
    );
}