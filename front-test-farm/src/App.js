import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Fragment } from "react";
import "./App.css";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import FarmerDetailList from "./pages/FarmersDetail/FarmerDetailList";
import Login from "./components/Layout/Login";
import FindPw from "./components/Layout/FindPw";
import FindEmail from "./components/Layout/FindEmail";
import Join from "./components/Layout/Join";
import { tokenLoader } from "./util/auth";
import ProductsForm from "./pages/ProductRegistration/ProductsForm";
import FarmersList from "./pages/Farmers/FarmersList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      { path: "findfarmer", element: <FarmersList /> },
      { path: "farmersdetail", element: <FarmerDetailList /> },
      { path: "productform", element: <ProductsForm /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
