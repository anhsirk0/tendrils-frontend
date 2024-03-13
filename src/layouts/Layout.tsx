import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => (
  <div className="flex items-center justify-center h-screen min-w-screen">
    <div className="px-2 lg:px-8 w-full h-full min-h-0 flex flex-col">
      <Navbar />
      <Outlet />
    </div>
  </div>
);

export default Layout;
