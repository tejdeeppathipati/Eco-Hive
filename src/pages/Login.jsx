import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, facebookProvider, db } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "./Login.css";
import { FaGoogle, FaFacebook, FaLeaf } from "react-icons/fa"; // Leaf icon import

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const authToken = await userCredential.user.getIdToken();
            localStorage.setItem("authToken", authToken);
            navigate("/dashboard");
        } catch (error) {
            switch (error.code) {
                case "auth/user-not-found":
                    setErrorMessage("No user found with this email. Please check your email or sign up.");
                    break;
                case "auth/wrong-password":
                    setErrorMessage("Incorrect password. Please try again.");
                    break;
                case "auth/invalid-email":
                    setErrorMessage("Invalid email format. Please enter a valid email.");
                    break;
                default:
                    setErrorMessage("An error occurred. Please try again.");
            }
        }
    };

    const handleGoogleLogin = async () => {
        setErrorMessage("");
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const { uid, email, displayName } = result.user;

            // Check if the user exists in Firestore
            const userRef = doc(db, "users", uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                // If user doesn't exist, create a new record
                await setDoc(userRef, {
                    firstName: displayName.split(" ")[0],
                    lastName: displayName.split(" ")[1] || "",
                    email,
                    createdAt: new Date(),
                });
            }

            const authToken = await result.user.getIdToken();
            localStorage.setItem("authToken", authToken);
            alert(`Welcome ${displayName}!`);
            navigate("/dashboard");
        } catch (error) {
            setErrorMessage("Google Login Failed. Please try again.");
        }
    };

    const handleFacebookLogin = async () => {
        setErrorMessage("");
        try {
            const result = await signInWithPopup(auth, facebookProvider);
            const { uid, email, displayName } = result.user;

            // Check if the user exists in Firestore
            const userRef = doc(db, "users", uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                // If user doesn't exist, create a new record
                await setDoc(userRef, {
                    firstName: displayName.split(" ")[0],
                    lastName: displayName.split(" ")[1] || "",
                    email,
                    createdAt: new Date(),
                });
            }

            const authToken = await result.user.getIdToken();
            localStorage.setItem("authToken", authToken);
            alert(`Welcome ${displayName}!`);
            navigate("/dashboard");
        } catch (error) {
            setErrorMessage("Facebook Login Failed. Please try again.");
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1 className="login-title">
                    Welcome Back! <FaLeaf className="leaf-icon" />
                </h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form className="login-form" onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="options">
                        <a href="#" className="forgot-password">
                            Forgot your password?
                        </a>
                    </div>
                    <button type="submit" className="login-btn">
                        SIGN IN
                    </button>
                </form>
                <div className="divider">
                    <span></span> or <span></span>
                </div>
                <div className="social-login">
                    <button className="social-btn google" onClick={handleGoogleLogin}>
                        <FaGoogle className="social-icon" />
                        Sign in with Google
                    </button>
                    <button className="social-btn facebook" onClick={handleFacebookLogin}>
                        <FaFacebook className="social-icon" />
                        Sign in with Facebook
                    </button>
                </div>
                <p className="signup-prompt">
                    Don't have an account?{" "}
                    <span className="signup-link" onClick={() => navigate("/signup")}>
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
