import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Login from "./layouts/Login";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
