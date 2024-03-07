import { useAuthStore } from "@/store";
import SelectTheme from "./SelectTheme";

const Navbar = () => {
  const { plant, signout } = useAuthStore();

  return (
    <div className="sticky top-0">
      <div className="navbar bg-base-100 border-b border-b-base-content/30">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">Tendrils</a>
        </div>
        {/* <div className="navbar-center hidden lg:flex"></div> */}
        <div className="navbar-end space-x-4">
          <SelectTheme />
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-primary btn-circle avatar"
            >
              {plant.name.charAt(0)}
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm md:menu-md dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={signout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
