import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { groupBy } from "@/helpers";
import { useCreds } from "@/hooks";
import { appRoutes, GetRoute } from "@/AppRoutes";
import { Layout } from "@/components";

const allRoutes = groupBy(appRoutes, "kind");

const AppRoutes = () => {
  const plant = useCreds("uuid");

  return (
    <BrowserRouter>
      <Routes>
        {plant.uuid ? (
          <Route path="/" element={<Layout />}>
            {allRoutes["private"].map(GetRoute)}
          </Route>
        ) : (
          allRoutes["public"].map(GetRoute)
        )}
        {/* {allRoutes["independent"].map(GetRoute)} */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;