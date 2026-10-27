
import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Login submitted");
    };

    return (
        <section className="login1">
                
                <div className="login-right">
                    

                    <h2>Login to Your Account</h2>
                    <p className="login-subtitle">
                        Enter your details to continue.
                    </p>

                    <form onSubmit={handleLogin}>
                        <div className="login-field">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="login-field">
                            <label htmlFor="password">Password</label>
                            <div className="password-box">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="show-password"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        <div className="login-options">
                            <label className="remember-me">
                                <input type="checkbox" />
                                Remember me
                            </label>

                            <Link to="/forgot-password">
                                Forgot password?
                            </Link>
                        </div>

                        <button type="submit" className="login-btn">
                            Login
                        </button>
                    </form>

                    <p className="register-text">
                        Don't have an account?{" "}
                        <Link to="/register">Register</Link>
                    </p>
                </div>
        </section>
    );
}

export default Login;
