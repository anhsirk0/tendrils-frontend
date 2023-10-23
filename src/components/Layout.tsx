import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-screen min-w-screen">
      {children}
    </div>
  );
};

export default Layout;
