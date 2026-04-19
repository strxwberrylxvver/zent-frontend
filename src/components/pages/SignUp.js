import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API } from "../api/API";
import FormItem from "../UI/Form";

const USER_TYPES = ["Student", "Financial Advisor", "Parent/Carer"];

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

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    const newErrors = {};
    if (!form.firstName) newErrors.firstName = "First name is required.";
    if (!form.lastName) newErrors.lastName = "Last name is required.";
    if (!form.email) newErrors.email = "Email is required.";
    if (!form.password) newErrors.password = "Password is required.";
    if (!form.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password.";
    if (
      form.password &&
      form.confirmPassword &&
      form.password !== form.confirmPassword
    )
      newErrors.confirmPassword = "Passwords do not match.";
    if (!form.userType) newErrors.userType = "Please select a user type.";
    return newErrors;
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

    if (response.isSuccess) {
      navigate("/signin");
    } else {
      setErrors({ general: response.message });
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
    <h1>Welcome to Zent!</h1>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <FormItem
          label="First Name"
          htmlFor="firstName"
          error={errors.firstName}
        >
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={form.firstName}
            onChange={handleChange}
          />
        </FormItem>

        <FormItem label="Last Name" htmlFor="lastName" error={errors.lastName}>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={form.lastName}
            onChange={handleChange}
          />
        </FormItem>

        <FormItem label="Email" htmlFor="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
        </FormItem>

        <FormItem label="Password" htmlFor="password" error={errors.password}>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
        </FormItem>

        <FormItem
          label="Confirm Password"
          htmlFor="confirmPassword"
          error={errors.confirmPassword}
        >
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </FormItem>

        <FormItem label="User Type" htmlFor="userType" error={errors.userType}>
          <select
            id="userType"
            name="userType"
            value={form.userType}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select User Type
            </option>
            {USER_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </FormItem>

        {errors.general && <p className="FormError">{errors.general}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
}
