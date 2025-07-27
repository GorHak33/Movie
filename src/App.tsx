import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home";
import "./App.less"; // Add this for global styles

const Placeholder = ({ title }: { title: string }) => {
  return (
    <div className="page-content">
      <div className="placeholder">{title} Page (Mock)</div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Placeholder title="Search" />} />
          <Route path="/tv" element={<Placeholder title="TV Shows" />} />
          <Route path="/movies" element={<Placeholder title="Movies" />} />
          <Route path="/genres" element={<Placeholder title="Genres" />} />
          <Route
            path="/watch-later"
            element={<Placeholder title="Watch Later" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
