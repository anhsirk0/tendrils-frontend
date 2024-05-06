// icons imports
import { IconLogout, IconUserCircle } from "@tabler/icons-react";

// other imports
import { Link } from "react-router-dom";

// local imports
import { RoutesMap } from "@/AppRoutes";
import { usePlant } from "@/hooks";
import { useAuthStore } from "@/store";
import { toAvatar } from "@/helpers";

const UserDropdown = () => {
  const { signout } = useAuthStore();
  const plant = usePlant();

  return plant
    .run((p) => (
      <div className="dropdown dropdown-end ml-3">
        {p.avatarUrl ? (
          <div className="avatar placeholder" tabIndex={0} role="button">
            <div className="rounded-btn w-8 2xl:w-10 h-8 2xl:h-10">
              <img alt="avatar" src={p.avatarUrl} />
            </div>
          </div>
        ) : (
          <div
            tabIndex={0}
            role="button"
            className="btn btn-primary btn-sm 2xl:btn-md"
          >
            {toAvatar(p.name)}
          </div>
        )}
        <ul
          tabIndex={0}
          className="menu menu-sm md:menu-md dropdown-content mt-3 z-[1] p-2 shadow bg-primary text-primary-content rounded-box w-52"
        >
          <li>
            <Link to={RoutesMap.PROFILE.path.replace(/:.*/, p.plantname)}>
              <IconUserCircle />
              <span className="font-semibold">Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/" onClick={signout}>
              <IconLogout />
              <span className="font-semibold">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    ))
    .unwrapOr(
      <Link to="/" className="btn btn-primary btn-sm 2xl:btn-md ml-3">
        Sign In
      </Link>
    );
};

export default UserDropdown;
