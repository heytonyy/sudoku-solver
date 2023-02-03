import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { StateProvider } from './context/stateContext';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Loader from './pages/Loader';
import Solution from './pages/Solution';
import Error from './pages/Error';
import CatchAllError from './pages/CatchAllError';
import './styles/styles.css'
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <StateProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loading" element={<Loader />} />
          <Route path="/solution" element={<Solution />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<CatchAllError />} />
        </Routes>
      </StateProvider>
    </BrowserRouter>
  );
}

export default App;