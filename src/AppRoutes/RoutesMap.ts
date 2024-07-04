import { lazy } from "react";
// import { Navigate } from "react-router-dom";

import type { AppRoute } from "./types";

const Home = lazy(() => import("@/pages/Home"));
const Create = lazy(() => import("@/pages/Create"));
const Profile = lazy(() => import("@/pages/Profile"));
const Tendril = lazy(() => import("@/pages/Tendril"));
const Signin = lazy(() => import("@/pages/Signin"));
const Signup = lazy(() => import("@/pages/Signin/Signup"));
const Explore = lazy(() => import("@/pages/Explore"));

class RoutesMap {
  // Private Routes
  static HOME: AppRoute = {
    title: "Home",
    path: "",
    subRoutes: {},
    Element: Home,
    // Skeleton: DashboardSkeleton,
    kind: "private",
  };
  static CREATE: AppRoute = {
    title: "Create",
    path: "create",
    subRoutes: {},
    Element: Create,
    // Skeleton: DashboardSkeleton,
    kind: "private",
  };

  // Public Routes
  static SIGNIN: AppRoute = {
    title: "Signin",
    path: "",
    subRoutes: {},
    Element: Signin,
    kind: "public",
  };

  static SIGNUP: AppRoute = {
    title: "Signup",
    path: "new",
    subRoutes: {},
    Element: Signup,
    kind: "public",
  };
  // static FORGET_PASSWORD: AppRoute = {
  //   title: "Forget Password",
  //   path: "forget-password",
  //   subRoutes: {},
  //   Element: ForgetPassword,
  //   kind: "public",
  // };

  // Independent Routes
  static PROFILE: AppRoute = {
    title: "Profile",
    path: "p/:plantname",
    subRoutes: {},
    Element: Profile,
    // Skeleton: DashboardSkeleton,
    kind: "independent",
  };

  static TENDRILS: AppRoute = {
    title: "Tendril",
    path: "t/:uuid",
    subRoutes: {},
    Element: Tendril,
    // Skeleton: DashboardSkeleton,
    kind: "independent",
  };

  static EXPLORE: AppRoute = {
    title: "Explore",
    path: "explore",
    subRoutes: {},
    Element: Explore,
    // Skeleton: DashboardSkeleton,
    kind: "independent",
  };
}

export default RoutesMap;
