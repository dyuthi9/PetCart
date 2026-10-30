import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./Auth.css"
function Shop() {

    const [searchParams] = useSearchParams();

    const searchTerm = searchParams.get("search") || "";

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://petcart-api-qxd2.onrender.com/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const filteredProducts = products.filter((product) =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="home1">

            <h2>Search Results</h2>

            <p>Searching for: {searchTerm}</p>

            {loading ? (
                <p>Loading products...</p>
            ) : filteredProducts.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div className="row">
                    {filteredProducts.map((product) => (
                        <div className="col-md-3 mb-4" key={product._id}>
                            <div className="card p-3">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="card-img-top"
                                />
                                <h5>{product.name}</h5>
                                <p>₹{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}

export default Shop;