import React from "react";
import Main from "../template/Main";

const Home: React.FC = () => {
  return (
    <Main
      icon="home"
      title="Dashboard"
      subtitle="Sistema de gerenciamento financeiro"
    >
      <div className="container-fluid">
        <div className="row mb-4">
          <div className="col">
            <div className="display-5 fw-bold">Bem-vindo ao Sistema 👋</div>
            <p className="lead text-muted">
              Gerencie pessoas, categorias e transações financeiras de forma
              simples e organizada.
            </p>
            <hr />
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-3">
            <div className="card shadow-sm border-0 text-center p-3">
              <i className="fa fa-users fa-2x text-primary mb-2"></i>
              <h5>Pessoas</h5>
              <p className="text-muted small">
                Cadastro e gerenciamento de usuários do sistema.
              </p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0 text-center p-3">
              <i className="fa fa-tags fa-2x text-warning mb-2"></i>
              <h5>Categorias</h5>
              <p className="text-muted small">
                Organização das transações por finalidade.
              </p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0 text-center p-3">
              <i className="fa fa-exchange fa-2x text-success mb-2"></i>
              <h5>Transações</h5>
              <p className="text-muted small">
                Controle de receitas e despesas com validações automáticas.
              </p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0 text-center p-3">
              <i className="fa fa-bar-chart fa-2x text-danger mb-2"></i>
              <h5>Relatórios</h5>
              <p className="text-muted small">
                Visualização de totais por pessoa e categoria.
              </p>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col text-center text-muted small">
            Desenvolvido em React com integração API ASP.NET Core.
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Home;
