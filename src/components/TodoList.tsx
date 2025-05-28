import React from 'react';
import { Task } from '../types';
import TodoItem from './TodoItem';
import '../styles/TodoList.css';

interface TodoListProps {
    tasks: Task[];
    removeTask: (id: number) => void;
    toggleTaskCompletion: (id: number) => void;
    updateTask: (id: number, newText: string) => void;
    removeCompletedTasks: () => void;
}

const TodoList: React.FC<TodoListProps> = ({ 
    tasks, 
    removeTask, 
    toggleTaskCompletion, 
    updateTask,
    removeCompletedTasks 
}) => {
    const completedTasks = tasks.filter(task => task.completed).length;

    return (
        <div className="todo-container">
            <h1 className="todo-header">TODOLIST</h1>
            
            <ul className="todo-list">
                {tasks.map(task => (
                    <TodoItem
                        key={task.id}
                        task={task}
                        removeTask={removeTask}
                        toggleTaskCompletion={toggleTaskCompletion}
                        updateTask={updateTask}
                    />
                ))}
            </ul>
            
            <div className="task-counter">
                {completedTasks} of {tasks.length} tasks done
            </div>
            
            {completedTasks > 0 && (
                <button 
                    className="remove-checked-button"
                    onClick={removeCompletedTasks}
                >
                    Remove checked
                </button>
            )}
        </div>
    );
};

export default TodoList;