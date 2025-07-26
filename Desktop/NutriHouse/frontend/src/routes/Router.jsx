import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";  // added Outlet
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import ListaPazienti from "../pages/pazienti/Lista";
import NuovaDieta from "../pages/pazienti/diete/NuovaDieta";
import ModificaDieta from "../pages/pazienti/diete/ModificaDieta";
import EliminaDieta from "../pages/pazienti/diete/EliminaDieta";
import ListaDiete from "../pages/pazienti/diete/Index";
import DettaglioDieta from "../pages/pazienti/diete/DettaglioDieta";
import Planner from "../pages/planner/Calendario";
import ListaAlimenti from "../pages/pazienti/diete/alimenti/ListaAlimenti";
import NuovoAlimento from "../pages/pazienti/diete/alimenti/NuovoAlimento";
import ModificaAlimento from "../pages/pazienti/diete/alimenti/ModificaAlimento";
import EliminaAlimento from "../pages/pazienti/diete/alimenti/EliminaAlimento";
import PrivateRoute from "../components/PrivateRoute";
import MainLayout from "../components/layouts/MainLayout";
import NuovoPaziente from "../pages/pazienti/Nuovo";
import DettaglioPaziente from "../pages/pazienti/Dettaglio";
import ModificaPaziente from "../pages/pazienti/Modifica";
import PazienteDelete from "../pages/pazienti/Delete";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pazienti" element={<ListaPazienti />} />
          <Route path="/pazienti/nuova" element={<NuovoPaziente />} />
          <Route path="/pazienti/:id" element={<Outlet />}>
            {/* Patient detail and actions */}
            <Route index element={<DettaglioPaziente />} />
            <Route path="modifica" element={<ModificaPaziente />} />
            <Route path="delete" element={<PazienteDelete />} />

            {/* Diete nested under a patient */}
            <Route path="diete" element={<Outlet />}>
              <Route index element={<ListaDiete />} />
              <Route path="nuova" element={<NuovaDieta />} />
              <Route path=":dietaId" element={<DettaglioDieta />} />
              <Route path=":dietaId/modifica" element={<ModificaDieta />} />
              <Route path=":dietaId/elimina" element={<EliminaDieta />} />
              {/* Alimenti nested under a specific diet */}
              <Route path=":dietaId/alimenti" element={<Outlet />}>
                <Route index element={<ListaAlimenti />} />
                <Route path="nuova" element={<NuovoAlimento />} />
                <Route path=":alimentoId/modifica" element={<ModificaAlimento />} />
                <Route path=":alimentoId/elimina" element={<EliminaAlimento />} />
              </Route>
            </Route>
          </Route>

          <Route path="/planner" element={<Planner />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
