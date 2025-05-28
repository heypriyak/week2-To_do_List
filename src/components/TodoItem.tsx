import React, { useState } from 'react';
import { Task } from '../types';

interface TodoItemProps {
    task: Task;
    removeTask: (id: number) => void;
    toggleTaskCompletion: (id: number) => void;
    updateTask: (id: number, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, removeTask, toggleTaskCompletion, updateTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);

    const handleUpdate = () => {
        if (editText.trim() !== '') {
            updateTask(task.id, editText);
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditText(task.text);
        setIsEditing(false);
    };

    return (
        <li>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
            />
            {isEditing ? (
                <span>
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        autoFocus
                    />
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </span>
            ) : (
                <span>
                    <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        {task.text}
                    </span>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => removeTask(task.id)}>Delete</button>
                </span>
            )}
        </li>
    );
};

export default TodoItem;