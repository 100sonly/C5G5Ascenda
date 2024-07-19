import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Test from "./pages/test";

function App() {
  return (
    <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<Test />} />
            <Route path="/about" element={<Test />} />
            <Route
                path="/events"
                element={<Test />}
            />
            <Route
                path="/annual"
                element={<Test />}
            />
            <Route path="/team" element={<Test />} />
            <Route path="/blogs" element={<Test />} />
            <Route
                path="/sign-up"
                element={<Test />}
            />
        </Routes>
    </Router>
);
}

export default App;
