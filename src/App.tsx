import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import TodoFilter from './components/TodoFilter';
import { Task, SortOption } from './types';
import './styles/App.css';

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<SortOption>('dateAdded');

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

    const sortTasks = (tasks: Task[]): Task[] => {
        return [...tasks].sort((a, b) => {
            switch (sortBy) {
                case 'dateAdded':
                    return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
                case 'alphabetical':
                    return a.text.localeCompare(b.text);
                case 'priority':
                    const priorityOrder = { high: 0, medium: 1, low: 2 };
                    return priorityOrder[a.priority] - priorityOrder[b.priority];
                case 'completionStatus':
                    return Number(a.completed) - Number(b.completed);
                default:
                    return 0;
            }
        });
    };

    const sortedAndFilteredTasks = sortTasks(filteredTasks);

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

            <div className="sort-container">
                <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="sort-select"
                >
                    <option value="dateAdded">Date Added</option>
                    <option value="alphabetical">Alphabetical</option>
                    <option value="priority">Priority</option>
                    <option value="completionStatus">Completion Status</option>
                </select>
            </div>

            <TodoList 
                tasks={sortedAndFilteredTasks} 
                removeTask={removeTask} 
                toggleTaskCompletion={toggleTaskCompletion}
                updateTask={updateTask}
                removeCompletedTasks={removeCompletedTasks}
            />
        </div>
    );
};

export default App;