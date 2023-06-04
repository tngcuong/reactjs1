import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { authRoutes, publicRoutes } from "./Routes/Routes";
import reducer from "./Reducer/Reducer";
import { itinialState } from "./Reducer/Reducer";
import AppContext from "./Context/context";
import Header from "./Components/Header/Header";
import axios from "axios";
import { getCurrentUser } from "./Reducer/action";
import Home from "./Pages/Home/Home";

function App() {
  const [state, dispatch] = useReducer(reducer, itinialState);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("https://whats-the-fox.onrender.com/api/v1/auth", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch(getCurrentUser(res.data.data.user));
        });
    }
  }, []);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <Header>
                  <route.component></route.component>
                </Header>
              }
            ></Route>
          ))}
          {authRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                state.user ? (
                  <Navigate to="/home"></Navigate>
                ) : (
                  <Header>
                    <route.component></route.component>
                  </Header>
                )
              }
            ></Route>
          ))}
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
