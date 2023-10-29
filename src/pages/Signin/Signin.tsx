import { NavLink, Navigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { clsx } from "clsx";

// local imports
import { AuthService } from "@/services";
import { Loading } from "@/components";
import { useRecord } from "@/hooks";
import { useAuthStore } from "@/store";
import { Some } from "@/helpers";

const Signin = () => {
  const { plant, signin } = useAuthStore();
  const [info, updateInfo] = useRecord({ plantname: "", password: "" });

  const { mutate, isPending } = useMutation({
    mutationFn: async () => (await AuthService.login({ data: info }))?.data,
    onSuccess: (resp) =>
      signin({
        name: Some.String(resp?.data?.name),
        uuid: Some.String(resp?.data?.uuid),
        plantname: Some.String(resp?.data?.plantname),
      }),
  });

  if (plant.uuid) return <Navigate to="/" replace />;
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
              isPending && "btn-disabled",
            )}
            disabled={isPending}
          >
            Sign in
          </Loading>
          <p className="mt-4 text-sm text-center">
            Don't Have An Account? {""}
            <NavLink to="new" className="underline cursor-pointer">
              Sign Up
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
