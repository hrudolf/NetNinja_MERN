import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';

// pages & components
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [json, setJson] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setLoggedIn(true);
      setJson(user);
    }
  }, [])

/*   useEffect(() => {
    console.log("logged in:", loggedIn);
    console.log("json:", json);
  }, [loggedIn, json]) */

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar setLoggedIn={setLoggedIn} setJson={setJson} loggedIn={loggedIn} json={json} />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={json ? <Home user={json} /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!json ? <Login setLoggedIn={setLoggedIn} setJson={setJson} /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!json ? <Signup setLoggedIn={setLoggedIn} setJson={setJson} /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
