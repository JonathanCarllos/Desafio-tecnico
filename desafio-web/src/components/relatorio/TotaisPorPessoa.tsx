import { useEffect, useState } from "react";
import api from "../../services/api";

interface Pessoa {
  pessoaId: number;
  nome: string;
}

interface Transacao {
  id: number;
  pessoaId: number;
  valor: number;
  tipo: "Despesa" | "Receita";
}

export default function TotaisPorPessoa() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [p, t] = await Promise.all([
        api.get("/Pessoas"),
        api.get("/transacoes"),
      ]);

      setPessoas(p.data);
      setTransacoes(t.data);
    } catch (err) {
      console.error(err);
    }
  };

  const calcularTotaisPessoa = (pessoaId: number) => {
    const transacoesPessoa = transacoes.filter(
      (t) => t.pessoaId === pessoaId
    );

    const totalReceitas = transacoesPessoa
      .filter((t) => t.tipo === "Receita")
      .reduce((acc, t) => acc + t.valor, 0);

    const totalDespesas = transacoesPessoa
      .filter((t) => t.tipo === "Despesa")
      .reduce((acc, t) => acc + t.valor, 0);

    return {
      totalReceitas,
      totalDespesas,
      saldo: totalReceitas - totalDespesas,
    };
  };

  const totalGeralReceitas = transacoes
    .filter((t) => t.tipo === "Receita")
    .reduce((acc, t) => acc + t.valor, 0);

  const totalGeralDespesas = transacoes
    .filter((t) => t.tipo === "Despesa")
    .reduce((acc, t) => acc + t.valor, 0);

  const saldoGeral = totalGeralReceitas - totalGeralDespesas;

  return (
    <div className="container mt-4">
      <h2>Totais por Pessoa</h2>

      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Pessoa</th>
            <th>Total Receitas</th>
            <th>Total Despesas</th>
            <th>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map((p) => {
            const totais = calcularTotaisPessoa(p.pessoaId);

            return (
              <tr key={p.pessoaId}>
                <td>{p.nome}</td>
                <td>
                  {totais.totalReceitas.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td>
                  {totais.totalDespesas.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td
                  style={{
                    color: totais.saldo >= 0 ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {totais.saldo.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
              </tr>
            );
          })}

          <tr className="table-secondary fw-bold">
            <td>Total Geral</td>
            <td>
              {totalGeralReceitas.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </td>
            <td>
              {totalGeralDespesas.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </td>
            <td
              style={{
                color: saldoGeral >= 0 ? "green" : "red",
              }}
            >
              {saldoGeral.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
