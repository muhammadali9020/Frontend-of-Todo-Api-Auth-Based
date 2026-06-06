import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
const Home = lazy(() => import("./Pages/Home"));
import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";
import { Navigate } from "react-router";
import IsAuth from "./Utils/IsAuth";
import Loading from "../src/Assets/Images/Loading_Img.gif";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <div
      style={{
        background: localStorage.getItem("theme") ? "black" : "white",
        minHeight: "100vh",
        color: localStorage.getItem("theme") ? "white" : "black",
      }}
      className="selection:text-green-400"
    >
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <IsAuth>
                <Suspense
                  fallback={
                    <div className="h-screen flex justify-center items-center">
                      <img
                        width={50}
                        src={Loading}
                        alt="loading spinner image"
                      />
                    </div>
                  }
                >
                  <Home />
                </Suspense>
              </IsAuth>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
