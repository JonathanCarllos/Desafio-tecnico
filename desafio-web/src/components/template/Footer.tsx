import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <span>
        <i className="fa fa-briefcase"></i>
        {" "}Desafio de vaga de teste – Jonathan Carlos
      </span>

      <span className="social">
        <a href="https://github.com/JonathanCarllos" target="_blank" rel="noreferrer">
          <i className="fa fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/jonathancarllos/" target="_blank" rel="noreferrer">
          <i className="fa fa-linkedin"></i>
        </a>
      </span>
    </footer>
  );
}
