import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { groupBy } from "@/helpers";
import { usePlant } from "@/hooks";
import { appRoutes, GetRoute } from "@/AppRoutes";
import { Layout, AuthLayout } from "@/layouts";

const allRoutes = groupBy(appRoutes, "kind");

const AppRoutes = () => {
  const plant = usePlant();

  return (
    <BrowserRouter>
      <Routes>
        {plant.isJust() ? (
          <Route path="/" element={<Layout />}>
            {allRoutes["private"].map(GetRoute)}
          </Route>
        ) : (
          <Route path="/" element={<AuthLayout />}>
            {allRoutes["public"].map(GetRoute)}
          </Route>
        )}
        <Route path="/" element={<Layout />}>
          {allRoutes["independent"].map(GetRoute)}
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
