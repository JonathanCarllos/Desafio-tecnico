import { Routes, Route } from "react-router-dom";

import Home from "../components/home/Homer";
import UserCrud from "../components/user/UserCrud";
import CategoriaCrud from "../components/categoria/CategoriaCrud";
import TransacaoCrud from "../components/transacao/TransacaoCrud";
import TotaisPorPessoa from "../components/relatorio/TotaisPorPessoa";
import TotaisPorCategoria from "../components/relatorio/TotaisPorCategoria";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<UserCrud />} />   
      <Route path="/categories" element={<CategoriaCrud />} />
      <Route path="/transacoes" element={<TransacaoCrud />} />
      <Route path="/totais" element={<TotaisPorPessoa />} />
      <Route path="/totais-categorias" element={<TotaisPorCategoria />} />
    </Routes>
  );
}
