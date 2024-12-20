import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Login/Login";
import CreateEmployee from "./CreateEmployee/CreateEmployee";
import EmployeeList from "./CreateEmployee/EmployeeList";
import Navbar from "./Navbar/Navbar";
import PrivateRoute from "./PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/createemp"
              element={
                <PrivateRoute>
                  <CreateEmployee />
                </PrivateRoute>
              }
            />
            <Route
              path="/emplist"
              element={
                <PrivateRoute>
                  <EmployeeList />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
