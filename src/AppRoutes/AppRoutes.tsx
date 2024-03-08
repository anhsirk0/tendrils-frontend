import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { groupBy } from "@/helpers";
import { useCreds } from "@/hooks";
import { appRoutes, GetRoute } from "@/AppRoutes";
import { Layout } from "@/components";
import AuthLayout from "@/pages/Signin";

const allRoutes = groupBy(appRoutes, "kind");

const AppRoutes = () => {
  const plant = useCreds("token", "isLoggedIn");

  return (
    <BrowserRouter>
      <Routes>
        {plant.isLoggedIn && plant.token ? (
          <Route path="/" element={<Layout />}>
            {allRoutes["private"].map(GetRoute)}
          </Route>
        ) : (
          <Route path="/" element={<AuthLayout />}>
            {allRoutes["public"].map(GetRoute)}
          </Route>
        )}
        {/* {allRoutes["independent"].map(GetRoute)} */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
