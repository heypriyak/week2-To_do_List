import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import TodoFilter from './components/TodoFilter';
import { Task } from './types';
import './styles/App.css';

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<string>('all');

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (task: Task) => {
        setTasks([...tasks, task]);
    };

    const removeTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleTaskCompletion = (id: number) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const updateTask = (id: number, newText: string) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, text: newText } : task
        ));
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'active') return !task.completed;
        return true;
    });

    const removeCompletedTasks = () => {
        setTasks(tasks.filter(task => !task.completed));
    };

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const activeTasks = totalTasks - completedTasks;

    return (
        <div className="app-container">
            <h1 className="app-title">Todo List</h1>
            
            <div className="stats-container">
                <span>Total Tasks: {totalTasks}</span>
                <span>Active: {activeTasks}</span>
                <span>Completed: {completedTasks}</span>
            </div>

            <div className="app-controls">
                <AddTodo addTask={addTask} />
                <TodoFilter setFilter={setFilter} />
            </div>

            <TodoList 
                tasks={filteredTasks} 
                removeTask={removeTask} 
                toggleTaskCompletion={toggleTaskCompletion}
                updateTask={updateTask}
                removeCompletedTasks={removeCompletedTasks}
            />
        </div>
    );
};

export default App;