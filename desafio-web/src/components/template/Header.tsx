import "./Header.css";

interface HeaderProps {
  title: string;
  icon?: string; 
}

export default function Header({ title, icon }: HeaderProps) {
  return (
    <header className="header d-none d-sm-flex flex-column">
      <h1 className="header-title">
        {icon && <i className={`fa fa-${icon}`}></i>}
        {title}
      </h1>
    </header>
  );
}
