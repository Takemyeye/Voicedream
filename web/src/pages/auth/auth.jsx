import Cookies from "js-cookie";
import React, { useState } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || (!isLogin && !formData.username)) {
      console.log("Enter your data");
      return;
    }

    if (!validatePassword(formData.password)) {
      setPasswordError("Password must be at least 8 characters, with 1 uppercase letter and 1 symbol.");
      return;
    } else {
      setPasswordError("");
    }

    const endpoint = isLogin ? "/signin" : "/signup";

    try {
      const response = await fetch(`cp.voicedream.space/api${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          Cookies.set("token", data.token);
          window.location = "/";
        }
      } else {
        console.error("Request failed:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => setIsLogin(true)}>Log In</button>
        <button onClick={() => setIsLogin(false)}>Sign Up</button>
      </div>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        <button type="submit">{isLogin ? "Log In" : "Sign Up"}</button>
      </form>
      <button style={{marginTop: "2rem"}} onClick={() => window.location = "cp.voicedream.space/api/google"}>LogIn with google</button>
    </div>
  );
};

export default Auth;
