import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Layout } from "@/components";
import Signin from "@/pages/Signin";
import Home from "@/pages/Home";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ToastContainer pauseOnFocusLoss={false} />
    <Router>
      <Routes>
        <Route path="/signin/*" element={<Signin />} />
        <Route path="/*" element={<Layout children={<Home />} />} />
      </Routes>
    </Router>
  </QueryClientProvider>
);

export default App;
