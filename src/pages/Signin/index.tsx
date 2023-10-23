import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";

const SigninPage = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-primary/40 flex justify-center items-center m-0 p-0 relative">
      <FloatingBox
        outer="-top-5 -left-16 z-0"
        inner="w-60 h-60 rounded-xl transform rotate-45"
      />
      <FloatingBox
        outer="-bottom-4 -right-10"
        inner="w-48 h-48 rounded-xl transform rotate-12"
      />
      <Routes>
        <Route path="/" element={<Signin />} index />
        <Route path="/new" element={<Signup />} />
      </Routes>
      <FloatingBox outer="top-0 right-12" inner="w-40 h-40 rounded-full" />
      <FloatingBox
        outer="bottom-10 left-10"
        inner="w-20 h-44 rounded-full transform rotate-45"
      />
    </div>
  );
};

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
