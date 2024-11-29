import {
  Action,
  createSlice,
  Dispatch,
  MiddlewareAPI,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from 'axios';
import { Task } from "../interfaces";

const initialState: {
  tasks: Task[];
} = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    addNewTask(state, action: PayloadAction<Task>) {
      state.tasks = [action.payload, ...state.tasks];
    },
    removeTask(state, action) {
      const newTasksList = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      state.tasks = newTasksList;
    },
    editTask(state, action: PayloadAction<Task>) {
      const taskId = action.payload.id;

      const newTaskEdited: Task = state.tasks.find(
        (task: Task) => task.id === taskId
      )!;
      const indexTask = state.tasks.indexOf(newTaskEdited);
      state.tasks[indexTask] = action.payload;
    },
    toggleTaskCompleted(state, action: PayloadAction<string>) {
      const taskId = action.payload;

      const currTask = state.tasks.find((task) => task.id === taskId)!;

      currTask.completed = !currTask.completed;
    },
    deleteAllData(state) {
      state.tasks = [];
    },
  },
});

export const fetchTasks = () => async (dispatch: any) => {
  try {
    const response = await axios.get('http://localhost:3000/tasks');
    const tasks = response.data.data.map((task: any) => ({
      ...task,
      date: task.due_date, // Map due_date to date
      completed: task.status === 1, // Treat status 1 as true and 0 as false
    }));
    console.log('Mapped Tasks:', tasks);
    dispatch(tasksSlice.actions.setTasks(tasks));
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
  }
};

export const addTaskToDatabase = (task: Task) => async (dispatch: any) => {
  try {
    const response = await axios.post('http://localhost:3000/tasks', task);
    if (response.data.message === "success") {
      dispatch(tasksSlice.actions.addNewTask({ ...task, id: response.data.data.id }));
    }
  } catch (error) { 
    console.error('Failed to add task:', error);
  }
};

export const updateTaskInDatabase = (task: Task) => async (dispatch: any) => {
  try {
    const response = await axios.put(`http://localhost:3000/tasks/${task.id}`, task);
    if (response.data.message === "success") {
      dispatch(tasksSlice.actions.editTask(task));
    }
  } catch (error) {
    console.error('Failed to update task:', error);
  }
};

export const deleteTaskFromDatabase = (taskId: string) => async (dispatch: any) => {
  try {
    const response = await axios.delete(`http://localhost:3000/tasks/${taskId}`);
    if (response.data.message === "success") {
      dispatch(tasksSlice.actions.removeTask(taskId));
    }
  } catch (error) {
    console.error('Failed to delete task:', error);
  }
};

export const tasksActions = tasksSlice.actions;
export default tasksSlice.reducer;

export const tasksMiddleware =
  (store: MiddlewareAPI) => (next: Dispatch) => (action: Action) => {
    const nextAction = next(action);

    if (action.type.startsWith("tasks/")) {
      const tasksList = store.getState().tasks.tasks;
      localStorage.setItem("tasks", JSON.stringify(tasksList));
    }

    if (tasksActions.deleteAllData.match(action)) {
      localStorage.removeItem("tasks");
      localStorage.removeItem("directories");
      localStorage.removeItem("darkmode");
    }

    if (tasksActions.removeTask.match(action)) {
      console.log(JSON.parse(localStorage.getItem("tasks")!));
      if (localStorage.getItem("tasks")) {
        const localStorageTasks = JSON.parse(localStorage.getItem("tasks")!);
        if (localStorageTasks.length === 0) {
          localStorage.removeItem("tasks");
        }
      }
    }
    return nextAction;
  };
