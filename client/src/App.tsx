import React from "react";
import { Routes, Route } from "react-router-dom";

import "./styles/App.scss";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";

export const UserContext = React.createContext<any>([]);

interface userInterface {
  token: String;
}

function App() {
  const [user, setUser] = React.useState<userInterface>({ token: "" });

  return (
    <UserContext.Provider value={[user, setUser]}>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
