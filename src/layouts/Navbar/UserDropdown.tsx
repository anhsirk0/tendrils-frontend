// icons imports
import { IconLogout, IconUserCircle } from "@tabler/icons-react";

// other imports
import { Link } from "react-router-dom";

// local imports
import { RoutesMap } from "@/AppRoutes";
import { usePlant } from "@/hooks";
import { useAuthStore } from "@/store";

const UserDropdown = () => {
  const { signout } = useAuthStore();
  const plant = usePlant();

  return plant
    .run((p) => (
      <div className="dropdown dropdown-end ml-3">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-primary btn-circle btn-sm 2xl:btn-md avatar"
        >
          {p.name.charAt(0)}
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm md:menu-md dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
        >
          <li>
            <Link to={RoutesMap.PROFILE.path.replace(/:.*/, p.plantname)}>
              <IconUserCircle />
              Profile
            </Link>
          </li>
          <li>
            <Link to="/" onClick={signout}>
              <IconLogout />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    ))
    .unwrapNull();
};

export default UserDropdown;
