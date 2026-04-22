import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API } from "../api/API";
import { useAuth } from "../auth/useAuth";
import FormItem from "../UI/Form";
import "./Auth.css";

export default function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    const response = await API.post("/auth/login", form);
    if (response.isSuccess) {
      login(response.result);
      navigate("/");
    } else {
      setErrors({ general: response.message });
    }
    setLoading(false);
  };

  return (
    <div className="authPage">
      <div className="authCard">
        <h1 className="authTitle">Sign in</h1>
        <p className="authSubtitle">
          Welcome back! Sign in to continue with Zent.
        </p>

        <form className="authForm" onSubmit={handleSubmit}>
          <FormItem label="Email" htmlFor="email" error={errors.email}>
            <input
              className={`authInput${errors.email ? " authInputError" : ""}`}
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </FormItem>

          <FormItem label="Password" htmlFor="password" error={errors.password}>
            <div className="authInputWrap">
              <input
                className={`authInput${
                  errors.password ? " authInputError" : ""
                }`}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="authEyeBtn"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? "𓁺" : "⌣"}
              </button>
            </div>
          </FormItem>

          {errors.general && <p className="authError">{errors.general}</p>}

          <button className="authSubmitBtn" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="authSwitch">
          Don't have an account?{" "}
          <Link to="/signup" className="authLink">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
