import { NavLink } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
  return (
    <aside className="menu-area">
      <nav className="menu">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <i className="fa fa-home"></i>
          Início
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <i className="fa fa-users"></i>
          Pessoas
        </NavLink>

        <NavLink
          to="/categories"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <i className="fa fa-tags"></i>
          Categorias
        </NavLink>

        <NavLink
          to="/transacoes"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <i className="fa fa-exchange"></i>
          Transações
        </NavLink>

        <NavLink
          to="/totais"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <i className="fa fa-calculator"></i>
          Totais por Pessoa
        </NavLink>

        <NavLink
          to="/totais-categorias"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <i className="fa fa-bar-chart"></i>
          Totais por Categoria
        </NavLink>
      </nav>
    </aside>
  );
}
