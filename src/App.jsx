import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing";
import Services from "./pages/Services";
import About from "./pages/About";

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;