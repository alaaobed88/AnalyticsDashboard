import React from "react";
import { Box } from "@mui/material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Suspense, useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/firebase/config";

import AuthRoute from "@/firebase/Auth";
import Login from "@/firebase/login";

initializeApp(firebaseConfig);
// Lazy load the Dashboard component
const Dashboard = React.lazy(() => import("./scenes/dashboard"));

// Lazy load the Predictions component
const Predictions = React.lazy(() => import("./scenes/predictions"));
function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
            <Suspense fallback={<Box color="white">loading...</Box>}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <AuthRoute>
                      <Dashboard></Dashboard>
                    </AuthRoute>
                  }
                />
                <Route
                  path="/predictions"
                  element={
                    <AuthRoute>
                      <Predictions></Predictions>
                    </AuthRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Suspense>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
