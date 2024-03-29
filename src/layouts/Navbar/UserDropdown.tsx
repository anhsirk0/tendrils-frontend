import { IconLogout, IconUserCircle } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store";
import { usePlant } from "@/hooks";
import { RoutesMap } from "@/AppRoutes";

const UserDropdown = () => {
  const { signout } = useAuthStore();
  const plant = usePlant();

  return plant
    .run((p) => (
      <div className="dropdown dropdown-end ml-3">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-primary btn-circle avatar"
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
            <button onClick={signout}>
              <IconLogout />
              Logout
            </button>
          </li>
        </ul>
      </div>
    ))
    .unwrapNull();
};

export default UserDropdown;
