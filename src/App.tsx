import { FC, lazy, Suspense, ReactNode } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Layout, Loader } from "@/components";
const Home = lazy(() => import("@/pages/Home"));
const Signin = lazy(() => import("@/pages/Signin"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ToastContainer pauseOnFocusLoss={false} />
    <Router>
      <Routes>
        <Route path="/signin/*" element={<Suspensed children={<Signin />} />} />
        <Route
          path="/*"
          element={<Layout children={<Suspensed children={<Home />} />} />}
        />
      </Routes>
    </Router>
  </QueryClientProvider>
);

const Suspensed: FC<{ children: ReactNode }> = ({ children }) => (
  <Suspense fallback={<Layout children={<Loader />} />} children={children} />
);

export default App;
