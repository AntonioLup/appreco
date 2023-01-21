import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todoItems";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
