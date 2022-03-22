
import './App.css';
import { InitialLanding } from './pages/InitialLanding';
import { Routes, Route } from "react-router-dom";
import { Landing } from './pages/Landing';

function App() {
  return (
    <div className="App">
      <Routes >
        <Route path="/" element={<InitialLanding />} />
        <Route path="/landing" element={<Landing />} />
      </Routes>
    </div >
  );
}

export default App;
