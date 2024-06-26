import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material'
import { indigo, amber } from '@mui/material/colors'
import { createTheme } from "@mui/material/styles"

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import NeighborhoodPage from './pages/NeighborhoodPage';
import AirbnbsPage from './pages/AirbnbsPage';
import AreaListingPage from './pages/AreaListingPage';
import RankPage from './pages/RankPage';
import AreaStatPage from './pages/AreaStatPage'

// createTheme enables you to customize the look and feel of your app past the default
// in this case, we only change the color scheme
export const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: amber,
  },
});

// App is the root component of our application and as children contain all our pages
// We use React Router's BrowserRouter and Routes components to define the pages for
// our application, with each Route component representing a page and the common
// NavBar component allowing us to navigate between pages (with hyperlinks)
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/neighborhood" element={<NeighborhoodPage />} />
          <Route path="/airbnb_list/:areaname" element={<AreaListingPage />} />
          <Route path="/search_listing" element={<AirbnbsPage />} />
          <Route path="/areas_statistics/:area_id" element={<AreaStatPage />} />
          <Route path="/areas_statistics" element={<AreaStatPage />} />
          <Route path="/rank" element={<RankPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
