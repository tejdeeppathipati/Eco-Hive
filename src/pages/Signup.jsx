import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '../firebase/firebase';
import './Signup.css';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert('Account created successfully!');
            navigate('/dashboard');
        } catch (error) {
            setErrorMessage(`Signup Failed: ${error.message}`);
        }
    };

    const handleGoogleLogin = async () => {
        setErrorMessage('');
        try {
            const result = await signInWithPopup(auth, googleProvider);
            alert(`Welcome ${result.user.displayName}!`);
            navigate('/dashboard');
        } catch (error) {
            setErrorMessage(`Google Signup Failed: ${error.message}`);
        }
    };

    const handleFacebookLogin = async () => {
        setErrorMessage('');
        try {
            const result = await signInWithPopup(auth, facebookProvider);
            alert(`Welcome ${result.user.displayName}!`);
            navigate('/dashboard');
        } catch (error) {
            setErrorMessage(`Facebook Signup Failed: ${error.message}`);
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <h1 className="signup-title">Sign Up!</h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form className="signup-form" onSubmit={handleSignup}>
                    <div className="name-fields">
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
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
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="signup-btn">
                        Sign Up
                    </button>
                </form>
                <div className="divider">
                    <span></span> or <span></span>
                </div>
                <div className="social-icons">
                    <div className="social-row">
                        <button className="social-btn google" onClick={handleGoogleLogin}>
                            <FaGoogle className="social-icon" />
                            Sign up with Google
                        </button>
                    </div>
                    <div className="social-row">
                        <button className="social-btn facebook" onClick={handleFacebookLogin}>
                            <FaFacebook className="social-icon" />
                            Sign up with Facebook
                        </button>
                    </div>
                </div>
                <p className="login-prompt">
                    Already have an account?{' '}
                    <span
                        className="login-link"
                        onClick={() => navigate('/')}
                    >
                        Log In!
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signup;
