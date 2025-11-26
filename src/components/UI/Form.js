import "./Form.css";
export default function FormItem({ children, label, htmlFor, advice, error }) {
  return (
    <div className="FormItem">
      <label className="FormLabel" htmlFor={htmlFor}>
      <h3>{label}</h3>
      </label>
      {advice && <p className="FormAdvice ">{advice}</p>}
      {children}
      {error && <p className="FormError">{error}</p>}
    </div>
  );
}
