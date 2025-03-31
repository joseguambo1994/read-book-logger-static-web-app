import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

type AuthUser = {
  identityProvider: string;
  userId: string;
  userDetails: string;
  userRoles: string[];
};

function App() {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    fetch("/.auth/me")
      .then((res) => res.json())
      .then((data) => {
        console.log("AUTH USER DATA:", data);
        if (data && data.clientPrincipal) {
          setUser(data.clientPrincipal);
        } else {
          setUser(null);
        }
      })
      .catch((err) => {
        console.error("Auth fetch error:", err);
        setUser(null);
      });
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>📚 Read Tracker App</h1>

      <div className="card">
        {user ? (
          <>
            <p>👋 Welcome, <strong>{user.userDetails}</strong></p>
            <p>🔑 Provider: {user.identityProvider}</p>
            <p>🧾 Roles: {user.userRoles.join(", ")}</p>
            <a href="/.auth/logout">🚪 Logout</a>
          </>
        ) : (
          <a href="/.auth/login/github?post_login_redirect_uri=/">🔐 Login with GitHub</a>
        )}
      </div>
    </>
  )
}

export default App
