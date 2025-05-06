import React, { useState } from 'react';

export default function AddTodo({addTodo}) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        addTodo(text);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex mb-3">
        <input
            type="text"
            className="form-control me-2"
            placeholder="Add new task"
            value={text}
            onChange={(e) => setText(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">Add</button>
        </form>
    );
}