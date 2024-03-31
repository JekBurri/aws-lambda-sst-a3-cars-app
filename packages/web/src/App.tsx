import { useState } from "react";
import Cars from "../components/Cars.tsx";
import Landing from "../components/Landing.tsx";
import Header from "../components/Header.tsx";
import Search from "../components/Search.tsx"
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

function App() {
  const [message, setMessage] = useState("Hi 👋");
  const { isAuthenticated } = useKindeAuth();

  async function onClick() {
    const res = await fetch(import.meta.env.VITE_APP_API_URL);
    const data = await res.json();
    setMessage(data.message);
  }

  return (
    <div>
      {isAuthenticated ? (
        <>
          <Header />
          <div className="w-full m-auto md:w-1/2">
            <Search />
            <Cars />
          </div>
        </>
      ) : (
        <Landing />
      )}
    </div>
  );
}

export default App;
