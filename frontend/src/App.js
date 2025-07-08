import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import LoginSignup from "./components/LoginSignup";
import Notes from "./components/Notes";
import Footer from "./components/Footer";
import NoteState from "./context/notes/NoteState";
import PrivateRoute from "./components/PrivateRoute";
const App = () => {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  return (
    <NoteState>
      <Router>
        <div className="min-h-screen flex flex-col bg-purple-50 dark:bg-gray-900 text-black dark:text-white">
          <Navbar toggleTheme={toggleTheme} theme={theme} />
          <main className="flex-grow">
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/auth" element={<LoginSignup />} />
              <Route
                path="/notes"
                element={
                  <PrivateRoute>
                    <Notes />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
          <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
      </Router>
    </NoteState>
  );
};

export default App;
