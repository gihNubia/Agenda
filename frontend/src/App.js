import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Active from './components/Active.js';
import Archived from './components/Archived.js';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Active />} />
          <Route path="/archived" element={<Archived />} />
        </Routes>
    </Router>
  );
}

export default App;