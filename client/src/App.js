import { Routes, Route } from "react-router-dom";
import LandingPage from './views/LandingPage';
import Home from "./views/Home";
import Form from './views/Form';
import Detail from "./views/Detail";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
    </div>
  );
}

export default App;