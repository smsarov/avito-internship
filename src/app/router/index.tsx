import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "@/constants/routes";
import { AdDetailsPage, AdEditPage, AdsListPage } from "@/pages";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={routes.ads} replace />} />
      <Route path="/ads">
        <Route index element={<AdsListPage />} />
        <Route path=":id">
          <Route index element={<AdDetailsPage />} />
          <Route path="edit" element={<AdEditPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
