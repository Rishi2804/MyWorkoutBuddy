import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import NavBar from "./components/NavBar"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={<Home />}
            />
            <Route 
              path="/login"
              element={<Login />}
            />
            <Route 
              path="/signup"
              element={<Signup />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
