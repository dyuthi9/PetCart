
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Petcart.png";
// import { useCart } from "../context/CartContext";
import "./Navbar.css";
import { useState } from "react";

function Navbar() {
    const [searchTerm, setSearchTerm] = useState("");
const navigate = useNavigate();

const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm.trim() !== "") {
        navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
    }
};

    return (
        <nav className="navbar navbar-expand-lg bg-white">
            <div className="container">

                {/* Logo */}
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="PetCart" width="140" />
                </Link>

                {/* Navigation Links */}
                <div className="petcart-links d-flex align-items-center gap-4">
                    <Link className="nav-link" to="/#home">Home</Link>
                    <Link className="nav-link" to="/#shop">Shop</Link>
                    <Link className="nav-link" to="/#categories">Categories</Link>
                    <Link className="nav-link" to="/#about">About</Link>
                    <Link className="nav-link" to="/#contact">Contact</Link>
                </div>

                {/* Search Bar */}
<form className="search-bar d-flex" onSubmit={handleSearch}>
    <input
        type="search"
        placeholder="Search for pet food, toys..."
        className="form-control"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
    />

    <button type="submit" aria-label="Search">
        <i className="bi bi-search"></i>
    </button>
</form>

                {/* Profile and Cart Icons */}
                <div className="d-flex gap-4 align-items-center">

                    <Link
                        className="icon-link"
                        aria-label="Profile"
                        to="/login"
                    >
                        <i className="bi bi-person-circle"></i>
                    </Link>

                    <Link
                        to="/cart"
                        className="icon-link cart-icon"
                    >
                        <i className="bi bi-cart3"></i>
                        {/* ({cartCount}) */}
                    </Link>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;
