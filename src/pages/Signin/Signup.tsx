import { FormEvent } from "react";

// other imports
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// local imports
import { RoutesMap } from "@/AppRoutes";
import { Button } from "@/components";
import { toTitleCase } from "@/helpers";
import { useApi, useRecord } from "@/hooks";
import { AuthService } from "@/services";

const SignUp = () => {
  const [info, updateInfo] = useRecord({
    name: "",
    plantname: "",
    password: "",
    confirmation: "",
  });

  const navigate = useNavigate();
  const { mutate, isPending } = useApi({
    fn: () => AuthService.signup({ data: info }),
    onSuccess: () => {
      toast.success("Account created successfully, you can login now");
      navigate("/");
    },
    onError: (resp) => toast.error(resp?.message || "Something went wrong"),
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
        <p className="w-80 text-center text-sm mb-8 font-semibold text-60">
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
          <Button
            loading={isPending}
            type="submit"
            className="btn btn-block btn-primary shadow"
          >
            Create Account
          </Button>
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
