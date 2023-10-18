import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing";
import Services from "./pages/Services";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ImgUpload from "./pages/ImgUpload";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route 
            exact
            path="/"
            element={ <Landing /> }
          />
          <Route
            exact
            path="/services"
            element={ <Services /> }
          />
          <Route
            exact
            path="/about"
            element={ <About /> }
          />
          <Route
            exact
            path="/login"
            element={ <Login /> }
          />
          <Route
            exact
            path="/signup"
            element={ <Signup /> }
          />
          <Route
            exact
            path="/upload"
            element={ <ImgUpload /> }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;