import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7A1128",
      main2: "#A32638",
    },
    secondary: {
      main: "#E8A33D",
    },

    bgolor: {
      main: "linear-gradient(45deg, #7A1128 30%, #E8A33D 90%)",
    },
    error: {
      main: "#B33951",
    },
  },
  typography: {
    fontFamily: "'Manrope', sans-serif",
  },
});

export default theme;
