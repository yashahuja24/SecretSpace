import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../App.css";
import "./AuthStyle.css";
const LoginSignup = ({setProgress}) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    repeat: "",
  });
  const handleChange = (e) =>
  setForm({ ...form, [e.target.name]: e.target.value });
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin && form.password !== form.repeat) {
      return toast.error("Passwords do not match");
    }
    const url = isLogin
      ? `${backendUrl}/api/auth/login`
      : `${backendUrl}/api/auth/createuser`;
    setProgress(5);
    const payload = isLogin
      ? { email: form.email, password: form.password }
      : { name: form.name, email: form.email, password: form.password };
      setProgress(15);
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await response.json();
    //Auth-token which is returned in response to login
    // console.log(json); // dont console it , user cant access the auth-token
    if (json.authToken) {
      localStorage.setItem("token", json.authToken);
      toast.success(isLogin ? "Login successful!" : "Signup successful!");
      navigate("/notes");
    } else {
      toast.error(json.error || "Something went wrong!");
    }
    setProgress(100);
  };
  return (
    <div className="auth-glass">
      <form onSubmit={handleSubmit} className="auth-form">
        <h1 className="auth-title">
          {isLogin ? "Welcome back!" : "Create an account"}
        </h1>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required={true}
            className="auth-input"
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required={true}
          className="auth-input"
        />
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}"
            title="Password must contain at least 8 characters, including uppercase, lowercase, number, and special character."
            value={form.password}
            onChange={handleChange}
            required
            className="auth-input pr-10"
          />
          <i
            className={`fa-solid ${
              showPassword ? "fa-eye-slash" : "fa-eye"
            } absolute right-3 top-4 cursor-pointer text-black-500`}
            onClick={() => setShowPassword(!showPassword)}
          ></i>
        </div>

        {!isLogin && (
          <input
            type="password"
            name="repeat"
            placeholder="Repeat Password"
            value={form.repeat}
            onChange={handleChange}
            required={true}
            className="auth-input"
          />
        )}

        <button type="submit" className="auth-button">
          {isLogin ? "Login" : "Register"}
        </button>

        <div className="auth-toggle-text">
          {isLogin ? (
            <>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="auth-link"
              >
                Don’t have an account? Register
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="auth-link"
              >
                Already have an account? Login
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginSignup;