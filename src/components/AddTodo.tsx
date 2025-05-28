import React, { useState } from 'react';
import { Task } from '../types';

interface AddTodoProps {
    addTask: (task: Task) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ addTask }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            const newTask: Task = {
                id: Date.now(),
                text: text.trim(),
                completed: false
            };
            addTask(newTask);
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a new task"
                required
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default AddTodo;