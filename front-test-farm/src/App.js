import { Fragment } from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import FarmerCard from "./pages/Farmers/FarmerCard";
import FarmersList from "./pages/Farmers/FarmersList";
import FarmerDetailCard from "./pages/FarmersDetail/FarmerDetailCard";
import FarmerDetailList from "./pages/FarmersDetail/FarmerDetailList";
import ProductRegForm from "./pages/ProductRegistration/ProductRegForm";
import ProductRegiForm from "./pages/ProductRegistration/ProductRegiForm";
import ProductsForm from "./pages/ProductRegistration/ProductsForm";

function App() {
    return (
        <Fragment>
            <Header />
            <FarmersList />
            {/* <FarmerDetailList /> */}
            {/* <FarmerDetailCard /> */}
            {/* <ProductRegForm /> */}
            {/* <ProductRegiForm /> */}
            {/* <ProductsForm /> */}
        </Fragment>
    );
}

export default App;
