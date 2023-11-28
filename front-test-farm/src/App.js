import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Fragment } from "react";
import "./App.css";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import Login from "./components/Layout/Login";
import FindPw from "./components/Layout/FindPw";
import FindEmail from "./components/Layout/FindEmail";
import Join from "./components/Layout/Join";
import { tokenLoader } from "./util/auth";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        id: "root",
        loader: tokenLoader,
        children: [{ index: true, element: <HomePage /> }],
    },
]);
function App() {
    return <RouterProvider router={router} />;
}

export default App;
