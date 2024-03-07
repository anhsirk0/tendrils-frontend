import { Outlet } from "react-router-dom";

const Layout = () => (
  <div className="flex items-center justify-center h-screen min-w-screen">
    <Outlet />
  </div>
);

export default Layout;
