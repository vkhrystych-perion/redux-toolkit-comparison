import store, { createTodoActionCreator } from "./redux-toolkit";
import { Todo } from "./type";

test("is todos/create adds element to array", () => {
  const prevTodosLength = store.getState().todos.length;

  store.dispatch(createTodoActionCreator({ desc: "This is test description" }));

  const updatedTodos: Todo[] = store.getState().todos;

  expect(updatedTodos.length === prevTodosLength).toBeFalsy();
  expect(updatedTodos.length === updatedTodos.length).toBeTruthy();
});

test("is todos/create new element has unique id", () => {
  store.dispatch(createTodoActionCreator({ desc: "This is test description" }));

  const updatedTodos: Todo[] = store.getState().todos;
  const addedElement = updatedTodos[updatedTodos.length - 1];

  const elementWithSameId = updatedTodos.find(
    (todo, index) =>
      index !== updatedTodos.length - 1 && todo.id === addedElement.id
  );

  expect(Boolean(elementWithSameId)).toBeFalsy();
  expect(elementWithSameId === undefined).toBeTruthy();
});
