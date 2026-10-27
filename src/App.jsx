import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"
import Home from "./components/Home";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";


function App(){
    return(
        <>
        <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home></Home>} ></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="*" element={<PageNotFound/>}></Route>

        </Routes>
        </BrowserRouter>
        </>
    )
}
export default App;