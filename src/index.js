import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Landing from "./pages/landing";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import "./style/index.css";
import Redirect from "./pages/redirect";
import InfoPage from "./pages/onboarding/infopage";
import Registration from "./pages/onboarding/registration";
import CurrentInterview from "./pages/stream/CurrentInterview";
import PickingUser from "./pages/stream/PickingUser";
import Timer from "./pages/stream/Timer";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/redirect",
    element: <Redirect />
  },
  {
    path: "/onboarding/info",
    element: <InfoPage />
  },
  {
    path: "/onboarding/registration",
    element: <Registration />
  },
  {
    path: "/stream/currentInterview",
    element: <CurrentInterview />
  },
  {
    path: "/stream/pickingUser",
    element: <PickingUser />
  },
  {
    path: "/stream/timer",
    element: <Timer />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  
);