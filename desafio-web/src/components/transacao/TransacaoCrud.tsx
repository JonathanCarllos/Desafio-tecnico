import { useEffect, useState } from "react";
import api from "../../services/api";
import "./TransacaoCrud.css";

type TipoTransacao = "Despesa" | "Receita";

interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  categoriaId: number;
  pessoaId: number;
}

interface Categoria {
  categoriaId: number;
  descricao: string;
  finalidade: "Despesa" | "Receita" | "Ambas";
}

interface Pessoa {
  pessoaId: number;
  nome: string;
  dataNascimento: string;
}

export default function TransacaoCrud() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState<number>(0);
  const [tipo, setTipo] = useState<TipoTransacao>("Despesa");
  const [categoriaId, setCategoriaId] = useState<number>(0);
  const [pessoaId, setPessoaId] = useState<number>(0);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [t, c, p] = await Promise.all([
        api.get("/transacoes"),
        api.get("/Categoria"),
        api.get("/Pessoas"),
      ]);

      setTransacoes(t.data);
      setCategorias(c.data);
      setPessoas(p.data);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar dados.");
    }
  };

  const calcularIdade = (dataNascimento: string) => {
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();

    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade;
  };

  const categoriasFiltradas = categorias.filter((c) => {
    if (tipo === "Despesa") {
      return c.finalidade === "Despesa" || c.finalidade === "Ambas";
    }
    return c.finalidade === "Receita" || c.finalidade === "Ambas";
  });

  const handleCreate = async () => {
    setError(null);

    if (!descricao.trim()) return setError("Descrição obrigatória.");
    if (valor <= 0) return setError("Valor deve ser positivo.");
    if (!categoriaId) return setError("Selecione uma categoria.");
    if (!pessoaId) return setError("Selecione uma pessoa.");

    const pessoa = pessoas.find((p) => p.pessoaId === pessoaId);
    if (!pessoa) return setError("Pessoa inválida.");

    const idade = calcularIdade(pessoa.dataNascimento);

    if (idade < 18 && tipo === "Receita") {
      return setError("Menor de idade só pode cadastrar Despesa.");
    }

    try {
      await api.post("/transacoes", {
        descricao,
        valor,
        tipo,
        categoriaId,
        pessoaId,
      });

      setDescricao("");
      setValor(0);
      setCategoriaId(0);
      setPessoaId(0);
      setTipo("Despesa");

      carregarDados();
    } catch {
      setError("Erro ao cadastrar transação.");
    }
  };

  return (
    <div className="container mt-4 transacao-container">
      <h2>Transações</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row mb-3 transacao-form">
        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Descrição"
            maxLength={400}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Valor"
            value={valor}
            onChange={(e) => setValor(Number(e.target.value))}
          />
        </div>

        <div className="col-md-2">
          <select
            className="form-select"
            value={tipo}
            onChange={(e) => {
              setTipo(e.target.value as TipoTransacao);
              setCategoriaId(0);
            }}
          >
            <option value="Despesa">Despesa</option>
            <option value="Receita">Receita</option>
          </select>
        </div>

        <div className="col-md-2">
          <select
            className="form-select"
            value={categoriaId}
            onChange={(e) => setCategoriaId(Number(e.target.value))}
          >
            <option value={0}>Categoria</option>
            {categoriasFiltradas.map((c) => (
              <option key={c.categoriaId} value={c.categoriaId}>
                {c.descricao}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <select
            className="form-select"
            value={pessoaId}
            onChange={(e) => setPessoaId(Number(e.target.value))}
          >
            <option value={0}>Pessoa</option>
            {pessoas.map((p) => (
              <option key={p.pessoaId} value={p.pessoaId}>
                {p.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-1">
          <button className="btn btn-primary w-100" onClick={handleCreate}>
            +
          </button>
        </div>
      </div>

      <table className="table table-striped transacao-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Categoria</th>
            <th>Pessoa</th>
          </tr>
        </thead>
        <tbody>
          {transacoes.map((t) => {
            const pessoa = pessoas.find((p) => p.pessoaId === t.pessoaId);
            const categoria = categorias.find(
              (c) => c.categoriaId === t.categoriaId,
            );

            return (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.descricao}</td>
                <td>
                  {t.valor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td>{t.tipo}</td>
                <td>{categoria ? categoria.descricao : "—"}</td>
                <td>{pessoa ? pessoa.nome : "—"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
