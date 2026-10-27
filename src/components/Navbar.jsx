
import { Link } from "react-router-dom";
import logo from "../assets/Petcart.png";
import "./Navbar.css";
function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-white">
            <div className="container">

                {/* Logo */}
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="PetCart" width="140" />
                </Link>

                {/* Navigation Links */}
                <div className="petcart-links d-flex align-items-center gap-4">
                    <a className="nav-link" href="/#home">Home</a>
                    <a className="nav-link" href="/#shop">Shop</a>
                    <a className="nav-link" href="/#categories">Categories</a>
                    <a className="nav-link" href="/#about">About</a>
                    <a className="nav-link" href="/#contact">Contact</a>
                </div>

                {/* Search Bar */}
                <form className="search-bar d-flex" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="search"
                        placeholder="Search for pet food, toys..."
                        className="form-control"
                    />
                    <button type="submit" aria-label="Search">
                        <i className="bi bi-search"></i>
                    </button>
                </form>


                {/* Icons */}

                <div className="d-flex gap-4 align-items-center">
                    <Link className="icon-link" aria-label="Profile" to="/login">
                        <i className="bi bi-person-circle"></i>
                    </Link>

                    <Link to="/" className="icon-link" aria-label="Shopping cart">
                        <i className="bi bi-cart3"></i>
                    </Link>
                </div>


            </div>
        </nav>
    );
}

export default Navbar;
