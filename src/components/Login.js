import React, { useState } from "react";
import { useExpenseContext } from "../context/ExpenseContext";

const Login = () => {
  const { setUser } = useExpenseContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError("لطفاً ایمیل و رمز عبور را وارد کنید.");
      return;
    }

    const user = { email, password };
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="p-4">
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <input
        type="email"
        placeholder="ایمیل"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="password"
        placeholder="رمز عبور"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <button
        type="button"
        onClick={handleLogin}
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        ورود
      </button>
      <button
        type="button"
        onClick={handleLogout}
        className="w-full p-2 bg-red-500 text-white rounded"
      >
        خروج
      </button>
    </div>
  );
};

export default Login;
