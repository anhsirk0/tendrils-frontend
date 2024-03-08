import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { clsx } from "clsx";

// local imports
import { AuthService } from "@/services";
import { Loading } from "@/components";
import { useRecord, useApi } from "@/hooks";
import { useAuthStore } from "@/store";
import { Some } from "@/helpers";
import { RoutesMap } from "@/AppRoutes";

const Signin = () => {
  const { signin } = useAuthStore();
  const [info, updateInfo] = useRecord({ plantname: "", password: "" });

  const { mutate, isPending } = useApi({
    fn: async () => await AuthService.login({ data: info }),
    onSuccess: (resp) => {
      toast.dismiss("err");
      const name = Some.String(resp?.data?.name);
      const token = Some.String(resp?.data?.token);
      signin({
        name,
        token,
        plantname: Some.String(resp?.data?.plantname),
        isLoggedIn: token.length > 37,
      });
      toast.success(`Welcome back, ${name}`);
    },
    onError: (r) =>
      toast.error(r?.message || "Something went wrong", { toastId: "err" }),
  });

  return (
    <div className="card bg-base-100 shadow-xl z-20 animate-twirl">
      <div className="card-body p-12">
        <h1 className="text-3xl font-bold text-center mb-2">Welcome back!</h1>
        <p className="w-80 text-center text-sm mb-8 font-semibold text-base-content/60">
          SignIn to your Tendrils account
        </p>
        <form
          id="signin-form"
          className="flex flex-col gap-4"
          onSubmit={(e) => (e.preventDefault(), mutate())}
        >
          <input
            value={info.plantname}
            onChange={(e) => updateInfo("plantname", e.target.value)}
            type="text"
            placeholder="Plantname"
            className="input input-bordered"
            required
          />
          <input
            value={info.password}
            onChange={(e) => updateInfo("password", e.target.value)}
            type="password"
            placeholder="Password"
            className="input input-bordered"
            required
          />
          <Loading
            on={isPending}
            component="button"
            type="submit"
            className={clsx(
              "btn btn-block btn-primary shadow",
              isPending && "btn-disabled"
            )}
            disabled={isPending}
          >
            Sign in
          </Loading>
          <p className="mt-4 text-sm text-center">
            Don't Have An Account? {""}
            <NavLink
              to={RoutesMap.SIGNUP.path}
              className="underline cursor-pointer"
            >
              Sign Up
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
