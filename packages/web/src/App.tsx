import { useState } from "react";
import Cars from "../components/Cars.jsx";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

function App() {
  const [message, setMessage] = useState("Hi 👋");
  const { isAuthenticated, login, register } = useKindeAuth();

  async function onClick() {
    const res = await fetch(import.meta.env.VITE_APP_API_URL);
    const data = await res.json();
    setMessage(data.message);
  }

  return (
    <>
      {isAuthenticated ? (
        <div>
          <button onClick={onClick}>
            Message is "<i>{message}</i>"
          </button>
          <Cars />
        </div>
      ) : (
        <>
          <button onClick={() => login()} type="button">
            Sign In
          </button>
          <p>Don't have an account yet?</p>
          <button onClick={() => register()} type="button">
            Sign up
          </button>
        </>
      )}
    </>
  );
}

export default App;
