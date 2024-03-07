import { FormEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { clsx } from "clsx";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

// local imports
import { AuthService } from "@/services";
import { useRecord } from "@/hooks";
import { Loading } from "@/components";
import { toTitleCase } from "@/helpers";
import { RoutesMap } from "@/AppRoutes";

const SignUp = () => {
  const [info, updateInfo] = useRecord({
    name: "",
    plantname: "",
    password: "",
    confirmation: "",
  });

  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => await AuthService.signup({ data: info }),
    onSuccess: () => {
      toast.success("Account created successfully, you can login now");
      navigate("/signin");
    },
    onError: (e: AxiosError<any>) =>
      toast.error(e?.response?.data?.message || "Something went wrong"),
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (info.password !== info.confirmation)
      return toast.error("Password and Confirmation didn't match", {
        toastId: "pc",
      });
    mutate();
  }

  return (
    <div className="card bg-base-100 shadow-xl z-20 animate-twirl">
      <div className="card-body p-12">
        <h1 className="text-3xl font-bold text-center mb-2">Create Account!</h1>
        <p className="w-80 text-center text-sm mb-8 font-semibold text-base-content/60">
          Create your Tendrils account
        </p>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {Object.keys(info).map((kee) => {
            const key = kee as keyof typeof info;
            return (
              <input
                key={kee}
                value={info[key]}
                onChange={(e) => updateInfo(key, e.target.value)}
                name={kee}
                type={
                  ["password", "confirmation"].includes(kee)
                    ? "password"
                    : "text"
                }
                placeholder={toTitleCase(kee)}
                className="input input-bordered"
                required
              />
            );
          })}
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
            Create Account
          </Loading>
          <p className="mt-4 text-sm text-center">
            Already have an Account? {""}
            <NavLink
              to={"/" + RoutesMap.SIGNIN.path}
              className="underline cursor-pointer"
            >
              Sign In
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
