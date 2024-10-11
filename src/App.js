// src/App.js
import React, { useEffect, useState, useContext } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import MDBox from "./components/UI/MDBox";
import theme from "./styles/theme";
import themeDark from "./styles/themeDark";
import SignIn from "./components/Auth/SignIn";
import PrivateRoute from "./components/Layout/PrivateRoute";
import routes from "./routes/routes";
import { msalConfig } from "./config/authConfig";
import { MsalProvider, useMsal, useIsAuthenticated } from "@azure/msal-react";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { GlobalStateProvider, GlobalStateContext } from "./contexts/GlobalStateContext";

const pca = new PublicClientApplication(msalConfig);

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [controller, setController] = useState({
    miniSidenav: false,
    direction: "ltr",
    layout: "dashboard",
    openConfigurator: false,
    sidenavColor: "blue",
    transparentSidenav: false,
    whiteSidenav: false,
    darkMode: false,
  });
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [allowedPages, setAllowedPages] = useState(["sign-in", "sign-up", "report", "authentication/sign-in", "unauthorized"]);
  const { instance, accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const { stateObj } = useContext(GlobalStateContext);

  useEffect(() => {
    const fetchAllowedPages = async () => {
      const allRouteKeys = routes.map((route) => route.key);
      setAllowedPages(allRouteKeys);
    };
    fetchAllowedPages();
  }, []);
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);
  useEffect(() => {
    if (stateObj) {
      const { AICallAssuranceAgent, AICallAssuranceMgr, AICallSummary } = stateObj;
      let allRouteKeys = AICallSummary ? allowedPages : allowedPages.filter((route) => route !== "callsummary");
      allRouteKeys = AICallAssuranceAgent || AICallAssuranceMgr ? allRouteKeys : allRouteKeys.filter((route) => route !== "callassurance");
      if (JSON.stringify(allRouteKeys) !== JSON.stringify(allowedPages)) {
        setAllowedPages(allRouteKeys);
      }
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [stateObj, allowedPages]);

  useEffect(() => {
    navigate(location.pathname);
  }, [inProgress, accounts, navigate, location.pathname]);
  useEffect(() => {
    const handleMsalEvent = (event) => {
      if (event.eventType === EventType.LOGIN_SUCCESS) {
        instance.setActiveAccount(event.payload.account);
      }
    };
    const callbackId = instance.addEventCallback(handleMsalEvent);
    return () => {
      if (callbackId) {
        instance.removeEventCallback(callbackId);
      }
    };
  }, [instance]);
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setController((prev) => ({ ...prev, miniSidenav: false }));
      setOnMouseEnter(true);
    }
  };
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setController((prev) => ({ ...prev, miniSidenav: true }));
      setOnMouseEnter(false);
    }
  };
  const handleConfiguratorOpen = () => {
    setController((prev) => ({ ...prev, openConfigurator: !prev.openConfigurator }));
  };
  const filteredRoutes = routes.filter((route) => allowedPages.includes(route.key));
  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      sx={{ backgroundColor: "white" }}
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="red"
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );
  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {}
      {configsButton}
      <Routes>
        <Route path="/authentication/sign-in" element={<SignIn />} />
        {filteredRoutes.map((route) => (
          <Route
            key={route.key}
            path={route.route}
            element={
              <PrivateRoute>
                {route.component}
              </PrivateRoute>
            }
          />
        ))}
        <Route path="*" element={<Navigate to="/callsummary" />} />
      </Routes>
    </ThemeProvider>
  );
}
function App() {
  return (
    <MsalProvider instance={pca}>
      <GlobalStateProvider>
        <AppContent />
      </GlobalStateProvider>
    </MsalProvider>
  );
}
export default App;














