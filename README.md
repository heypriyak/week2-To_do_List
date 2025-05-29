# README.md

# React To-Do List

This project is a simple React To-Do List application that allows users to manage their tasks efficiently. Users can add, remove, and mark tasks as completed. The application also includes features for input validation, dynamic task display, and optional sorting and filtering.

## Features

- Add new tasks with input validation
- Remove tasks from the list
- Mark tasks as completed
- Filter tasks based on completion status
- Sort tasks
- Integrate with localStorage for persistent task management

## Project Structure

```
todo-react-app
├── src
│   ├── components
│   │   ├── TodoList.tsx
│   │   ├── TodoItem.tsx
│   │   ├── AddTodo.tsx
│   │   └── TodoFilter.tsx
│   ├── types
│   │   └── index.ts
│   ├── utils
│   │   └── storage.ts
│   ├── App.tsx
│   └── index.tsx
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd todo-react-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

## Testing Guidance

To test the application, you can manually interact with the UI to ensure that all features work as expected. Check the following:

- Adding tasks with valid and invalid inputs
- Removing tasks
- Marking tasks as completed
- Filtering and sorting tasks
- Verifying that tasks persist after refreshing the page

Feel free to explore the code in the `src` directory for a deeper understanding of the implementation.

![image](https://github.com/user-attachments/assets/94c362a4-999e-445d-848b-5ae6e6037600)
