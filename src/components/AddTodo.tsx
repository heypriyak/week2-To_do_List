import React, { useState } from 'react';
import { Task } from '../types';

interface AddTodoProps {
    addTask: (task: Task) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ addTask }) => {
    const [text, setText] = useState('');
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            const newTask: Task = {
                id: Date.now(),
                text: text.trim(),
                completed: false,
                dateAdded: new Date(),
                priority
            };
            addTask(newTask);
            setText('');
            setPriority('medium');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-todo-form">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a new task"
                className="todo-input"
            />
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                className="priority-select"
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <button type="submit" className="add-button">Add</button>
        </form>
    );
};

export default AddTodo;