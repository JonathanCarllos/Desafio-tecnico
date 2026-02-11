import { useEffect, useState } from "react";
import api from "../../services/api";

interface Categoria {
  categoriaId: number;
  descricao: string;
}

interface Transacao {
  id: number;
  categoriaId: number;
  valor: number;
  tipo: "Despesa" | "Receita";
}

export default function TotaisPorCategoria() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [c, t] = await Promise.all([
        api.get("/Categoria"),
        api.get("/transacoes"),
      ]);

      setCategorias(c.data);
      setTransacoes(t.data);
    } catch (err) {
      console.error(err);
    }
  };

  const calcularTotaisCategoria = (categoriaId: number) => {
    const transacoesCategoria = transacoes.filter(
      (t) => t.categoriaId === categoriaId
    );

    const totalReceitas = transacoesCategoria
      .filter((t) => t.tipo === "Receita")
      .reduce((acc, t) => acc + t.valor, 0);

    const totalDespesas = transacoesCategoria
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
      <h2>Totais por Categoria</h2>

      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Categoria</th>
            <th>Total Receitas</th>
            <th>Total Despesas</th>
            <th>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((c) => {
            const totais = calcularTotaisCategoria(c.categoriaId);

            return (
              <tr key={c.categoriaId}>
                <td>{c.descricao}</td>
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
