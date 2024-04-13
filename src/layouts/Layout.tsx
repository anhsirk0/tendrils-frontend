import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => (
  <div className="center h-screen min-w-screen min-h-0">
    <div className="px-2 lg:px-4 2xl:px-8 w-full h-full flex flex-col min-h-0">
      <Navbar />
      <Outlet />
    </div>
  </div>
);

export default Layout;
