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
import LoadingBar from "react-top-loading-bar";
const App = () => {
  const [theme, setTheme] = useState("dark");
  const [progress,setProgress]=useState(0);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  return (
    <NoteState setProgress={setProgress}>
      <Router>
        <div className="min-h-screen flex flex-col bg-purple-50 dark:bg-gray-900 text-black dark:text-white">
          <Navbar toggleTheme={toggleTheme} theme={theme} />
          <LoadingBar
            color="#f11946"
            height={3}
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
          <main className="flex-grow">
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home setProgress={setProgress}/>
                  </PrivateRoute>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/auth" element={<LoginSignup setProgress={setProgress} />} />
              <Route
                path="/notes"
                element={
                  <PrivateRoute>
                    <Notes setProgress={setProgress} />
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
