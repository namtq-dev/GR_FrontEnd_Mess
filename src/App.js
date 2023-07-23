import { io } from 'socket.io-client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import { useSelector } from 'react-redux';
import SocketContext from './context/socketContext';

// Socker io
const socket = io(process.env.REACT_APP_BACKEND_URL);

function App() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="dark">
      <SocketContext.Provider value={socket}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={!!user?.loginToken ? <Home /> : <Navigate to="/login" />}
              exact
            ></Route>
            <Route
              path="/login"
              element={!user?.loginToken ? <Login /> : <Navigate to="/" />}
              exact
            ></Route>
            <Route
              path="/register"
              element={!user?.loginToken ? <Register /> : <Navigate to="/" />}
              exact
            ></Route>
          </Routes>
        </Router>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
