import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";
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
                    <Route path="/categories" element={<Categories />}></Route>
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="*" element={<PageNotFound />}></Route>

                </Routes>
            </BrowserRouter>
        </>
    )
}
export default App;