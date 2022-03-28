
import './App.css';
import { InitialLanding } from './pages/InitialLanding';
import { Landing } from './pages/Landing';
import { useEffect, useState } from "react";

function App() {
  const [alreadyExistingUser, setExistingUser] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("name");
    setExistingUser(user);
  }, [alreadyExistingUser]);
  return (
    <div className="App">
      {alreadyExistingUser ? <Landing /> : <InitialLanding />
      }
    </div >
  );
}

export default App;
