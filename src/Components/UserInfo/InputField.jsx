function InputField({ label, name, register, error, type = "text", placeholder }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", marginBottom: "12px" }}>
      {label}
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        style={{ padding: "6px", borderRadius: "6px", border: "1px solid #aaa" }}
      />
      {error && <span style={{ color: "red", fontSize: "12px" }}>{error}</span>}
    </label>
  );
}

export default InputField;
