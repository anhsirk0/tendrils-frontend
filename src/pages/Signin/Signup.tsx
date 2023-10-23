import { FC } from "react";
import { NavLink } from "react-router-dom";
import { useRecord } from "@/hooks";

const SignUp: FC = () => {
  const [info, updateInfo] = useRecord({
    username: "",
    password: "",
    confirmation: "",
  });

  return (
    <div className="card bg-base-100 shadow-xl z-20 animate-flip">
      <div className="card-body p-12">
        <h1 className="text-3xl font-bold text-center mb-2">Create Account!</h1>
        <p className="w-80 text-center text-sm mb-8 font-semibold text-base-content/60 tracking-wide">
          Create your Tendrils account
        </p>
        <form id="signin-form" method="post" className="flex flex-col gap-4">
          <input
            value={info.username}
            onChange={(e) => updateInfo("username", e.target.value)}
            name="username"
            type="text"
            placeholder="Username"
            className="input input-bordered"
          />
          <input
            value={info.password}
            onChange={(e) => updateInfo("password", e.target.value)}
            name="password"
            type="password"
            placeholder="Password"
            className="input input-bordered"
          />
          <input
            value={info.confirmation}
            onChange={(e) => updateInfo("confirmation", e.target.value)}
            name="confirmation"
            type="password"
            placeholder="Confirm password"
            className="input input-bordered"
          />
          <button type="submit" className="btn btn-block btn-primary shadow">
            Create Account
          </button>
          <p className="mt-4 text-sm text-center">
            Already have an Account? {""}
            <NavLink to="/signin" className="underline cursor-pointer">
              Sign In
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
