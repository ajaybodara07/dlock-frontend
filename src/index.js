import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#019AE8",
      dark: "#29394D",
    },
    background: {
      paper: "#29394D",
      default: "#29394D",
    },
  },
  typography: {
    fontWeightLight: 700,
    fontWeightRegular: 700,
    fontWeightMedium: 700,
  },
  props: {
    MuiButton: {
      disableRipple: true,
    },
    // MuiButtonBase: {
    //   disableRipple: true,
    // },
  },
  overrides: {
    MuiFilledInput: {
      root: {
        borderRadius: "0 !important",
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
