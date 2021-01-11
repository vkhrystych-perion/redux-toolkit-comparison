import { v1 as uuid } from "uuid";
import { combineReducers, createStore } from "redux";

export interface Todo {
  id: string;
  desc: string;
  isComplete: boolean;
}

export interface State {
  todos: Todo[];
  selectedTodo: string | null;
  counter: number;
}

// Constants

const CREATE_TODO = "CREATE_TODO";
const EDIT_TODO = "EDIT_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const DELETE_TODO = "DELETE_TODO";
const SELECT_TODO = "SELECT_TODO";

// Actions & Action Type

interface CreateTodoActionType {
  type: typeof CREATE_TODO;
  payload: Todo;
}

export const createTodoActionCreator = ({
  desc,
}: {
  desc: string;
}): CreateTodoActionType => ({
  type: CREATE_TODO,
  payload: {
    desc,
    id: uuid(),
    isComplete: false,
  },
});

interface EditTodoActionType {
  type: typeof EDIT_TODO;
  payload: {
    id: string;
    desc: string;
  };
}

export const editTodoActionCreator = ({
  id,
  desc,
}: {
  id: string;
  desc: string;
}): EditTodoActionType => ({
  type: EDIT_TODO,
  payload: {
    id,
    desc,
  },
});

interface ToggleTodoActionType {
  type: typeof TOGGLE_TODO;
  payload: {
    id: string;
    isComplete: boolean;
  };
}

export const toggleTodoActionCreator = ({
  id,
  isComplete,
}: {
  id: string;
  isComplete: boolean;
}): ToggleTodoActionType => ({
  type: TOGGLE_TODO,
  payload: {
    id,
    isComplete,
  },
});

interface DeleteTodoActionType {
  type: typeof DELETE_TODO;
  payload: {
    id: string;
  };
}

export const deleteTodoActionCreator = ({
  id,
}: {
  id: string;
}): DeleteTodoActionType => ({
  type: DELETE_TODO,
  payload: {
    id,
  },
});

interface SelectTodoActionType {
  type: typeof SELECT_TODO;
  payload: {
    id: string;
  };
}

export const selectTodoActionCreator = ({
  id,
}: {
  id: string;
}): SelectTodoActionType => ({
  type: SELECT_TODO,
  payload: {
    id,
  },
});

// Reducers

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

type TodoActionTypes =
  | CreateTodoActionType
  | EditTodoActionType
  | ToggleTodoActionType
  | DeleteTodoActionType
  | SelectTodoActionType;

const todoReducer = (state: Todo[] = initialState, action: TodoActionTypes) => {
  switch (action.type) {
    case CREATE_TODO: {
      const { payload } = action;
      return [...state, payload];
    }
    case EDIT_TODO: {
      const { payload } = action;
      return state.map((todo) =>
        todo.id === payload.id ? { ...todo, desc: payload.desc } : todo
      );
    }

    case TOGGLE_TODO: {
      const { payload } = action;
      return state.map((todo) =>
        todo.id === payload.id ? { ...todo, isComplete: todo.isComplete } : todo
      );
    }

    case DELETE_TODO: {
      const { payload } = action;
      return state.filter((todo) => todo.id !== payload.id);
    }

    default: {
      return state;
    }
  }
};

type SelectedTodoActionTypes = SelectTodoActionType;

const selectedTodoReducer = (
  state: string | null = null,
  action: SelectedTodoActionTypes
) => {
  switch (action.type) {
    case SELECT_TODO: {
      const { payload } = action;

      return payload.id;
    }
    default: {
      return state;
    }
  }
};

const counterReducer = (state: number = 0, action: TodoActionTypes) => {
  switch (action.type) {
    case CREATE_TODO: {
      return state + 1;
    }

    case EDIT_TODO: {
      return state + 1;
    }

    case TOGGLE_TODO: {
      return state + 1;
    }

    case DELETE_TODO: {
      return state + 1;
    }

    default: {
      return state;
    }
  }
};

export const reducers = combineReducers({
  todos: todoReducer,
  selectedTodo: selectedTodoReducer,
  counter: counterReducer,
});

export default createStore(reducers);
