import { ReactNode } from "react";
import "./Main.css";

interface MainProps {
  title: string;
  subtitle: string;
  icon?: string;
  children?: ReactNode;
}

const Main = ({ title, subtitle, icon, children }: MainProps) => {
  return (
    <main className="main">
      <header className="header">
        <h1>
          {icon && <i className={`fa fa-${icon}`} />} {title}
        </h1>
        <h2>{subtitle}</h2>
      </header>

      <section className="content">
        {children}
      </section>
    </main>
  );
};

export default Main;
