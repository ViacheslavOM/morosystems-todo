import React from "react";
import ReactDOM from "react-dom/client";
import { TodoList } from "./modules/pages";
import { Provider } from "react-redux";
import { store } from "./modules/store/store";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <TodoList />
      <ToastContainer position="bottom-left" />
    </Provider>
  </React.StrictMode>
);
