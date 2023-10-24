import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "@/components";
import Signin from "@/pages/Signin";
import Home from "@/pages/Home";

const App = () => (
  <Router>
    <Routes>
      <Route path="/signin/*" element={<Signin />} />
      <Route path="/*" element={<Layout children={<Home />} />} />
    </Routes>
  </Router>
);

export default App;
