import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate,defer } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";

import { useSelector } from "react-redux";
import { selectUser } from "./app/authslice";

import './App.css';
import About from './pages/about';

function App() {
  const isAuthenticated = useSelector(selectUser);

  return (
    <div className="App">
      <Router>
        <Routes>
         {
          isAuthenticated ?
          <Route path="/">
               <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
               <Route path="*" element={<Navigate to="/home" />} />
          </Route>:
          <Route path="/">
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/" />} />
           </Route>
        }
        </Routes>
      </Router>

    </div>
  );
}

export default App;




/*
 const protectedRoute = [
    {
      path: "/login",
      element: <Login />
    }
  ];

  const privateRoute = [
    {
      path: "/logout",
      element: <Logout />
    },
    {
      path: "/",
      element: <Home />
    }
  ];
 {privateRoute.map(({ path, element }) => (
            <Route
              path="/login"
              exact
              element={
                <ProtectedRoute>
                  {<Login />}
                </ProtectedRoute>
              }
            />
          ))}

          {protectedRoute.map(({ path, element }) => (
            <Route
              path="/logout"
              exact
              element={
                <PrivateRoute>
                  <Logout />
                </PrivateRoute>
              }
            />
          ))}
*/

