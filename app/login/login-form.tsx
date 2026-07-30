"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const username = String(form.get("username") ?? "").trim();
    const password = String(form.get("password") ?? "");

    if (!username || !password) {
      setStatus("Please enter both a username and password.");
      return;
    }

    setStatus("Opening demonstration valuation…");
    router.push("/");
  }

  return (
    <form className="loginForm" onSubmit={submit}>
      <div className="loginField">
        <label htmlFor="username">Username</label>
        <input
          autoComplete="username"
          id="username"
          name="username"
          placeholder="Enter any test username"
          required
          type="text"
        />
      </div>

      <div className="loginField">
        <div className="passwordLabel">
          <label htmlFor="password">Password</label>
          <button
            aria-controls="password"
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="showPassword"
            onClick={() => setShowPassword((current) => !current)}
            type="button"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <input
          autoComplete="current-password"
          id="password"
          name="password"
          placeholder="Enter any test password"
          required
          type={showPassword ? "text" : "password"}
        />
      </div>

      <div className="loginOptions">
        <button
          className="forgotButton"
          onClick={() =>
            setStatus("Password recovery is not connected in this demonstration.")
          }
          type="button"
        >
          Forgotten password?
        </button>
      </div>

      <button className="loginSubmit" type="submit">
        View demonstration
        <span aria-hidden="true">→</span>
      </button>

      <p aria-live="polite" className="loginStatus">
        {status}
      </p>
    </form>
  );
}
