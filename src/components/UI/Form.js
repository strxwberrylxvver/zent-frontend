import "./Form.css";

export default function FormItem({ children, label, htmlFor, error }) {
  return (
    <div className="FormItem">
      <label className="FormLabel" htmlFor={htmlFor}>
        <p>{label}</p>
      </label>
      {children}
      <div className="error">
        {error && <p className="FormError">{error}</p>}
      </div>
    </div>
  );
}