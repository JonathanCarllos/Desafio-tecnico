import "./Logo.css";
import logo from "../../assets/img/logo.png"
import { Link } from "react-router";

export default function Logo() {
  return (
    <aside className="logo">
      <Link to="/" className="logo">
      <img src={logo} alt="logo"/>
      </Link>
    </aside>
  );
}

