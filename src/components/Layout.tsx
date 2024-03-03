import { FC, ReactNode } from "react";

const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex items-center justify-center h-screen min-w-screen">
    {children}
  </div>
);

export default Layout;
