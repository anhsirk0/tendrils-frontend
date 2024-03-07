import { FC } from "react";
import { Routes } from "react-router-dom";
import { RoutesMap, GetRoute } from "@/AppRoutes";

const subRoutes = Object.keys(RoutesMap.SIGNIN.subRoutes).map(
  (key) => RoutesMap.SIGNIN.subRoutes[key]
);

const SigninPage = () => (
  <div className="min-h-screen overflow-hidden bg-primary/25 flex justify-center items-center m-0 p-0 relative">
    <FloatingBox
      outer="-top-5 -left-16 z-0"
      inner="w-60 h-60 rounded-xl transform rotate-45"
    />
    <FloatingBox
      outer="-bottom-4 -right-10"
      inner="w-48 h-48 rounded-xl transform rotate-12"
    />
    <Routes>{subRoutes.map(GetRoute)}</Routes>
    <FloatingBox outer="top-0 right-12" inner="w-40 h-40 rounded-full" />
    <FloatingBox
      outer="bottom-10 left-10"
      inner="w-20 h-44 rounded-full transform rotate-45"
    />
  </div>
);

interface Props {
  outer?: string;
  inner?: string;
}

const FloatingBox: FC<Props> = ({ outer = "", inner = "" }) => (
  <div className={"animate-float absolute " + outer}>
    <div className={"bg-primary hidden md:block " + inner} />
  </div>
);

export default SigninPage;
