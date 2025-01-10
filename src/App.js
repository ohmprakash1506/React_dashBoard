import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//components
import SideBar from './components/SideBar';
import UsersPage from './pages/UsersPage';
import CardsPage from './pages/CardsPage';

//materail Ui
import { CssBaseline, Box } from '@mui/material';

function App() {
  const drawerWidth = 240

  return (
    <Router>
      <CssBaseline/>
        <SideBar/>
          <Box sx={{
            flexGrow: 1,
            p: 3,
            ml: `${drawerWidth}px`,
          }}>
            <Routes>
              <Route path="/users" element={<UsersPage/>} />
              <Route path="/cards" element={<CardsPage/>} />
            </Routes>
          </Box>
    </Router>
  );
}

export default App;
