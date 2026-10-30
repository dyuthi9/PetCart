import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";
import Toys from "./pages/Toys";
import Pets from "./pages/Pets";
import Food from "./pages/Food";
import Care_Essentials from "./pages/Care_Essentials";
import Funiture from "./pages/Funiture";
import Categories from "./components/Categories";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";


function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login></Login>}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/toys" element={<Toys/>}></Route>
                    <Route path="/pets" element={<Pets />}></Route>
                    <Route path="/food" element={<Food />}></Route>
                    <Route path="/categories" element={<Categories />}></Route>
                    <Route path="/care_essentials" element={<Care_Essentials />}></Route>
                    <Route path="/funiture" element={<Funiture />}></Route>
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="*" element={<PageNotFound />}></Route>

                </Routes>
            </BrowserRouter>
        </>
    )
}
export default App;