import { Routes, Route } from 'react-router-dom';
import GithubCorner from 'react-github-corner';
import Home from './pages/Home';
import Loader from './pages/Loader';
import Solution from './pages/Solution';
import Error from './pages/Error';
import CatchAllError from './pages/CatchAllError';
import BugReport from './pages/BugReport';
import './styles/styles.css'
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <GithubCorner href="https://github.com/heytonyy" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loading" element={<Loader />} />
        <Route path="/solution" element={<Solution />} />
        <Route path="/error" element={<Error />} />
        <Route path="/bugreport" element={<BugReport />} />
        <Route path="*" element={<CatchAllError />} />
      </Routes>
    </>
  );
}

export default App;