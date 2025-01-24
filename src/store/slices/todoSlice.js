import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  filter: 'all', 
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: Date.now(),
        text: action.payload.text,
        completed: false,
        priority: action.payload.priority || 'medium',
        important: false,
        dueDate: action.payload.dueDate || null,
        createdAt: new Date().toISOString(),
      });
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        if (task.completed) {
          state.tasks = [
            ...state.tasks.filter(t => t.id !== task.id && !t.completed),
            ...state.tasks.filter(t => t.completed),
          ];
        } else {
          state.tasks = [
            task,
            ...state.tasks.filter(t => t.id !== task.id),
          ];
        }
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    updateTaskPriority: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.priority = action.payload.priority;
      }
    },
    toggleImportant: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.important = !task.important;
      }
    },
    updateDueDate: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.dueDate = action.payload.dueDate;
      }
    },
    editTask: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.text = action.payload.text;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {
  addTask,
  toggleTask,
  deleteTask,
  updateTaskPriority,
  toggleImportant,
  updateDueDate,
  editTask,
  setFilter,
} = todoSlice.actions;
export default todoSlice.reducer;