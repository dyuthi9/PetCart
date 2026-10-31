import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "./Auth.css";

const API = "https://petcart-api-qxd2.onrender.com";

function Login() {
  const { user, token, login, logout } = useAuth();
  const { items: cart, loading: cartLoading } = useCart();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Get the user's previous orders.
  useEffect(() => {
    if (!token) {
      setOrders([]);
      return;
    }

    const loadOrders = async () => {
      setOrdersLoading(true);

      try {
        const response = await fetch(`${API}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          logout();
          return;
        }

        if (!response.ok) {
          throw new Error("Could not load your orders.");
        }

        const data = await response.json();
        setOrders(data.orders || []);
      } catch (err) {
        console.error("Error loading orders:", err);
      } finally {
        setOrdersLoading(false);
      }
    };

    loadOrders();
  }, [token, logout]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

    setError("");
  };

  // Sign in with the registered email and password.
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || `Login failed (${response.status}).`
        );
      }

      if (!data.token || !data.user) {
        throw new Error("The server returned an incomplete login response.");
      }

      login(data.token, data.user);

      setForm({
        email: "",
        password: "",
      });
    } catch (err) {
      console.error("Login error:", err);

      if (err instanceof TypeError) {
        setError("Unable to connect. Please check your internet connection and try again.");
      } else {
        setError(err.message || "Unable to log in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

const handleDeleteOrder = async (orderId) => {
    const confirmDelete = window.confirm(
        "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    try {
        const response = await fetch(`${API}/orders/${orderId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Unable to delete order");
        }

        setOrders((previousOrders) =>
            previousOrders.filter((order) => order._id !== orderId)
        );

        alert("Order deleted successfully!");

    } catch (error) {
        console.error("Delete order error:", error);
        alert(error.message || "Unable to delete order.");
    }
};

  const handleLogout = () => {
    logout();
    setOrders([]);
  };

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("en-IN");

  // Account page shown after successful login.
  if (user) {
    const validCart = cart.filter((item) => item.product);

    const cartTotal = validCart.reduce(
      (total, item) =>
        total + Number(item.product.price || 0) * item.quantity,
      0
    );

    return (
      // <main className="auth-page">
        <section className="home1">
          <div className="account-header">
            <div>
              <p className="account-eyebrow">YOUR PETCART ACCOUNT</p>
              <h1>Welcome, {user.name}! 🐾</h1>
              <p className="account-intro">
                Here you can check your details, cart and previous orders.
              </p>
            </div>

            <button
              type="button"
              className="auth-logout"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>

          <div className="account-section">
            <h2>Personal details</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>

            {user.createdAt && (
              <p>
                <strong>Member since:</strong>{" "}
                {new Date(user.createdAt).toLocaleDateString("en-IN")}
              </p>
            )}
          </div>

          <div className="account-section">
            <div className="account-section-heading">
              <h2>Your cart</h2>
              <Link to="/cart" className="account-link">
                View cart →
              </Link>
            </div>

            {cartLoading ? (
              <p>Loading your cart...</p>
            ) : validCart.length > 0 ? (
              <>
                <ul className="account-list">
                  {validCart.map((item) => (
                    <li key={item.product._id}>
                      <span>{item.product.name} × {item.quantity}</span>
                      <strong>
                        ₹{formatPrice(
                          item.product.price * item.quantity
                        )}
                      </strong>
                    </li>
                  ))}
                </ul>

                <p className="account-total">
                  Cart total: ₹{formatPrice(cartTotal)}
                </p>
              </>
            ) : (
              <div className="account-empty">
                <p>Your cart is empty. Your next pet favourite is waiting!</p>
                <Link to="/#shop" className="account-link">
                  Explore products →
                </Link>
              </div>
            )}
          </div>

         
<div className="account-section">

    <h2>Previous Orders</h2>

    {ordersLoading ? (
        <p>Loading your orders...</p>
    ) : orders.length > 0 ? (

        orders.map((order) => (

            <article className="order-card" key={order._id}>

                <div className="order-header">
                    <strong>
                        Order #{order._id.slice(-6).toUpperCase()}
                    </strong>

                    <button
                        className="delete-order-btn"
                        onClick={() => handleDeleteOrder(order._id)}
                    >
                        Delete Order
                    </button>
                </div>

                <p className="order-date">
                    Order Date:{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-IN")}
                </p>

                <div className="order-details">

                    <h4>Order Details</h4>

                    {order.items?.map((item, index) => (

                        <div className="order-product" key={item._id || index}>

                            <span>
                                {item.name} × {item.quantity}
                            </span>

                            <strong>
                                ₹{formatPrice(item.price * item.quantity)}
                            </strong>

                        </div>

                    ))}

                    <hr />

                    <h4>Delivery Address</h4>

                    {order.address ? (
                        <>
                            <p>{order.address.fullName}</p>
                            <p>{order.address.phone}</p>
                            <p>{order.address.street}</p>
                            <p>
                                {order.address.city},{" "}
                                {order.address.state} - {order.address.pincode}
                            </p>
                        </>
                    ) : (
                        <p>Address details not available.</p>
                    )}

                    <h4>Payment Details</h4>

                    <p>
                        Payment Method:{" "}
                        {order.paymentMethod || "Not available"}
                    </p>

                    <div className="order-total">
                        Order Total: ₹{formatPrice(order.total)}
                    </div>

                </div>

            </article>

        ))

    ) : (
        <p>You haven't placed any orders yet.</p>
    )}

</div>


          <Link to="/" className="account-home-link">
            ← Continue shopping
          </Link>
        </section>
      // </main>
    );
  }

  // Login form shown to visitors.
  return (
    <main className=" auth-page">
      <section className="auth-container">
        <div className="auth-banner">
          <span className="auth-pet-icon" aria-hidden="true">
            🐶 🐱
          </span>

          <p className="auth-welcome-label">WELCOME TO PETCART</p>
          <h1>Good to see you again!</h1>

          <p>
            Your pet's favourite food, toys and essentials are just a
            few clicks away.
          </p>

          <div className="auth-banner-note">
            🐾 A little love goes a long way.
          </div>
        </div>

        <div className="auth-form-section">
          <Link to="/" className="auth-brand">
            <span aria-hidden="true">🐾</span> PetCart
          </Link>

          <h2>Welcome back</h2>
          <p className="auth-subtitle">
            Sign in to manage your account and orders.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="login-email">Email address</label>
              <input
                id="login-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="login-password">Password</label>

              <div className="auth-password-box">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="auth-show-password"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? "Signing you in..." : "Sign in"}
            </button>
          </form>

          <p className="auth-switch">
            New to PetCart? <Link to="/register">Create an account</Link>
          </p>

          <Link to="/" className="auth-home-link">
            ← Back to home
          </Link>
        </div>
      </section>
     </main>
  );
}

export default Login;