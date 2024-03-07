import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from "./pages/Home"
import Create from "./pages/Create/Create"
import History from './pages/History/History'
import Progress from './pages/Progress/Progress'
import Excercises from './pages/Exercises/Exercises'
import Signup from "./pages/AuthForms/Signup"
import Login from "./pages/AuthForms/Login"
import Header from "./components/Header/Header"
import UserBottomNav from './components/UserBottomNav'

function App() {
  const { user } = useAuthContext()


  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={<Navigate to="/create"/>}
            />
            <Route 
              path="/new"
              element={<Create/>}
            />
            <Route 
              path="/create"
              element={user ? <Home /> : <Navigate to="/login"/>}
            />
            <Route 
              path="/history"
              element={user ? <History /> : <Navigate to="/login"/>}
            />
            <Route 
              path="/excercises"
              element={user ? <Excercises /> : <Navigate to="/login"/>}
            />
            <Route 
              path="/progress"
              element={user ? <Progress /> : <Navigate to="/login"/>}
            />
            <Route 
              path="/login"
              element={!user ? <Login /> : <Navigate to="/create"/>}
            />
            <Route 
              path="/signup"
              element={ !user ? <Signup /> : <Navigate to="/create"/>}
            />
          </Routes>
        </div>
        {user && <UserBottomNav />}
      </BrowserRouter>
    </div>
  );
}

export default App;
