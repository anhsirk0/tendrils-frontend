import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

// local imports
import { AuthService } from "@/services";
import { Button } from "@/components";
import { useRecord, useApi } from "@/hooks";
import { useAuthStore } from "@/store";
import { Some } from "@/helpers";
import { RoutesMap } from "@/AppRoutes";

const Signin = () => {
  const { signin } = useAuthStore();
  const [info, updateInfo] = useRecord({ plantname: "", password: "" });

  const { mutate, isPending } = useApi({
    fn: () => AuthService.login({ data: info }),
    onSuccess: (resp) => {
      toast.dismiss("err");
      signin({
        id: Some.Number(resp?.data?.id),
        name: Some.String(resp?.data?.name),
        token: Some.String(resp?.data?.token),
        plantname: Some.String(resp?.data?.plantname),
        avatarUrl: Some.String(resp?.data?.avatarUrl),
      });
    },
    onError: (r) =>
      toast.error(r?.message || "Something went wrong", { toastId: "err" }),
  });

  return (
    <div className="card bg-base-100 shadow-xl z-20 animate-twirl">
      <div className="card-body p-12">
        <h1 className="text-3xl font-bold text-center mb-2">Welcome back!</h1>
        <p className="w-80 text-center text-sm mb-8 font-semibold text-60">
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
          <Button
            loading={isPending}
            type="submit"
            className="btn btn-block btn-primary shadow"
          >
            Sign in
          </Button>
          <p className="mt-4 text-sm text-center">
            Don&apos;t Have An Account? {""}
            <NavLink
              to={RoutesMap.SIGNUP.path}
              className="underline cursor-pointer"
            >
              Sign Up
            </NavLink>
          </p>
          <div className="divider" />
          <NavLink
            to={RoutesMap.EXPLORE.path}
            className="btn btn-outline btn-primary w-full"
          >
            Explore
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default Signin;
