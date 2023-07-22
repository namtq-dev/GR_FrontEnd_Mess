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

function App() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="dark">
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
    </div>
  );
}

export default App;
