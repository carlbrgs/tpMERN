import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        email,
        password,
      }, { withCredentials: true });
      document.cookie = `token=${response.data.token}; path=/;`;
      alert("Login successful");
      console.log("User data:", response.data);
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="card mx-auto" style={{ maxWidth: "400px" }}>
      <div className="card-body">
        <h1 className="card-title text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
          {error && <p className="text-danger mt-3 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;