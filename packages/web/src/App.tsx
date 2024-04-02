// import { useState } from "react";
import Cars from "../components/Cars.tsx";
import Landing from "../components/Landing.tsx";
import Home from "../components/Home.tsx"
import Header from "../components/Header.tsx";
import Search from "../components/Search.tsx"
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Routes, Route } from "react-router-dom";


function App() {
  const { isAuthenticated } = useKindeAuth();

  return (
    <div>
      {isAuthenticated ? (
        <>
          <Header />
          <div className="w-full m-auto md:w-1/2">
            <Routes>
                <Route index element={<Home />} />
                <Route path="inventory" element={<><Search /><Cars /></>} />
                <Route path="contact" element={<p>contact</p>} />              
            </Routes>
          </div>
        </>
      ) : (
        <Landing />
      )}
    </div>
  );
}

export default App;
