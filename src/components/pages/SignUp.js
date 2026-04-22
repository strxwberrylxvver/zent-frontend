import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API } from "../api/API";
import FormItem from "../UI/Form";
import "./Auth.css";

const USER_TYPES = [
  { label: "Student", value: "Student" },
  { label: "Financial Advisor", value: "Financial Advisor" },
  { label: "Parent/Carer", value: "Parent" },
];

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.firstName) e.firstName = "First name is required.";
    if (!form.lastName) e.lastName = "Last name is required.";
    if (!form.email) e.email = "Email is required.";
    if (!form.password) e.password = "Password is required.";
    if (!form.confirmPassword)
      e.confirmPassword = "Please confirm your password.";
    if (
      form.password &&
      form.confirmPassword &&
      form.password !== form.confirmPassword
    )
      e.confirmPassword = "Passwords do not match.";
    if (!form.userType) e.userType = "Please select a user type.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);
    setLoading(true);
    setErrors({});
    const response = await API.post("/auth/register", {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      userType: form.userType,
    });
    if (response.isSuccess) navigate("/signin");
    else setErrors({ general: response.message });
    setLoading(false);
  };

  return (
    <div className="authPage">
      <div className="authCard">
        <h1 className="authTitle">Welcome to Zent!</h1>
        <p className="authSubtitle">
          Sign up and start managing your finances now.
        </p>

        <form className="authForm" onSubmit={handleSubmit}>
          <div className="authRow">
            <FormItem
              label="First Name"
              htmlFor="firstName"
              error={errors.firstName}
            >
              <input
                className={`authInput${
                  errors.firstName ? " authInputError" : ""
                }`}
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First name"
                value={form.firstName}
                onChange={handleChange}
              />
            </FormItem>

            <FormItem
              label="Last Name"
              htmlFor="lastName"
              error={errors.lastName}
            >
              <input
                className={`authInput${
                  errors.lastName ? " authInputError" : ""
                }`}
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last name"
                value={form.lastName}
                onChange={handleChange}
              />
            </FormItem>
          </div>

          <FormItem label="Email" htmlFor="email" error={errors.email}>
            <input
              className={`authInput${errors.email ? " authInputError" : ""}`}
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={form.email}
              onChange={handleChange}
            />
          </FormItem>

          <FormItem
            label="Create password"
            htmlFor="password"
            error={errors.password}
          >
            <div className="authInputWrap">
              <input
                className={`authInput${
                  errors.password ? " authInputError" : ""
                }`}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Must be 8 characters"
                value={form.password}
                onChange={handleChange}
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

          <FormItem
            label="Confirm password"
            htmlFor="confirmPassword"
            error={errors.confirmPassword}
          >
            <div className="authInputWrap">
              <input
                className={`authInput${
                  errors.confirmPassword ? " authInputError" : ""
                }`}
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="Repeat password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="authEyeBtn"
                onClick={() => setShowConfirm((v) => !v)}
              >
                {showConfirm ? "𓁺" : "⌣"}
              </button>
            </div>
          </FormItem>

          <FormItem
            label="I am a..."
            htmlFor="userType"
            error={errors.userType}
          >
            <div className="authUserTypes">
              {USER_TYPES.map(({ label, value }) => (
                <button
                  key={value}
                  type="button"
                  className={`authTypeBtn${
                    form.userType === value ? " authTypeBtn--active" : ""
                  }`}
                  onClick={() =>
                    setForm((prev) => ({ ...prev, userType: value }))
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </FormItem>

          {errors.general && <p className="authError">{errors.general}</p>}

          <button className="authSubmitBtn" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="authSwitch">
          Already have an account?{" "}
          <Link to="/signin" className="authLink">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
