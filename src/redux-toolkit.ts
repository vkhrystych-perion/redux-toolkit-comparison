import {
  createSlice,
  configureStore,
  getDefaultMiddleware,
  PayloadAction,
} from "@reduxjs/toolkit";
import { v1 as uuid } from "uuid";
import logger from "redux-logger";

import { Todo } from "./type";

const initialState: Todo[] = [
  {
    id: uuid(),
    desc: "Learn React",
    isComplete: true,
  },
  {
    id: uuid(),
    desc: "Learn Redux",
    isComplete: true,
  },
  {
    id: uuid(),
    desc: "Learn Redux-Toolkit",
    isComplete: false,
  },
];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    create: {
      reducer: (
        state,
        {
          payload,
        }: PayloadAction<{ id: string; desc: string; isComplete: boolean }>
      ) => {
        state.push(payload);
      },
      prepare: ({ desc }: { desc: string }) => ({
        payload: {
          id: uuid(),
          desc,
          isComplete: false,
        },
      }),
    },
    edit: (state, { payload }: PayloadAction<{ id: string; desc: string }>) => {
      const index = state.findIndex((todo) => todo.id === payload.id);

      if (index !== -1) state[index].desc = payload.desc;
    },
    toggle: (
      state,
      { payload }: PayloadAction<{ id: string; isComplete: boolean }>
    ) => {
      const index = state.findIndex((todo) => todo.id === payload.id);

      if (index !== -1) state[index].isComplete = payload.isComplete;
    },
    remove: (state, { payload }: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((todo) => todo.id === payload.id);

      if (index !== -1) state.splice(index, 1);
    },
  },
});

const selectedTodoSlice = createSlice({
  name: "selectedTodo",
  initialState: null as string | null,
  reducers: {
    select: (state, { payload }: PayloadAction<{ id: string }>) =>
      (state = payload.id),
  },
});

const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {},
  extraReducers: {
    [todosSlice.actions.create.type]: (state) => state + 1,
    [todosSlice.actions.edit.type]: (state) => state + 1,
    [todosSlice.actions.toggle.type]: (state) => state + 1,
    [todosSlice.actions.remove.type]: (state) => state + 1,
  },
});

export const {
  create: createTodoActionCreator,
  edit: editTodoActionCreator,
  remove: removeTodoActionCreator,
  toggle: toggleTodoActionCreator,
} = todosSlice.actions;

export const { select: selectTodoActionCreator } = selectedTodoSlice.actions;

const reducer = {
  todos: todosSlice.reducer,
  counter: counterSlice.reducer,
  selectedTodo: selectedTodoSlice.reducer,
};

const middleware = [...getDefaultMiddleware(), logger];

export default configureStore({
  reducer,
  middleware,
});
