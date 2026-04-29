import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout.jsx";
import Home from "./Components/Home/Home.jsx";
import TodoInputs from "./Components/TodoInputs/TodoInputs.jsx";
import TodoList from "./Components/TodoList/TodoList.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";

let routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "addtask", element: <TodoInputs /> },
      { path: "todolist", element: <TodoList /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <RouterProvider router={routers}></RouterProvider>
      </div>
    </>
  );
}

export default App;
