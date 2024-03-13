import { IconPlus } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";

import SelectTheme from "./SelectTheme";
import UserDropdown from "./UserDropdown";
import { RoutesMap } from "@/AppRoutes";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="sticky top-0">
      <div className="navbar bg-base-100 border-b border-b-base-content/30">
        <div className="navbar-start">
          <Link to={RoutesMap.HOME.path} className="btn btn-ghost text-xl">
            Tendrils
          </Link>
        </div>
        {/* <div className="navbar-center hidden lg:flex"></div> */}
        <div className="navbar-end">
          <Link
            to={RoutesMap.CREATE.path}
            className="btn btn-sm xl:btn-md xl:px-3 btn-ghost font-normal"
          >
            <IconPlus />
          </Link>
          <SelectTheme />
          <UserDropdown key={location.pathname} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
