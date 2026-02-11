import { useEffect, useState } from "react";
import api from "../../services/api";
import { Categoria } from "../../types/Categoria";
import { FinalidadeCategoria } from "../../types/FinalidadeCategoria";

export default function CategoriaCrud() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [descricao, setDescricao] = useState("");
  const [finalidade, setFinalidade] = useState<FinalidadeCategoria>(
    FinalidadeCategoria.Despesa
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const carregarCategorias = async () => {
    try {
      const response = await api.get<Categoria[]>("/Categoria");
      setCategorias(response.data);
    } catch {
      setError("Erro ao carregar categorias");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  const handleCreate = async () => {
    if (!descricao.trim()) return;

    try {
      await api.post("/Categoria", { descricao, finalidade });
      setDescricao("");
      setFinalidade(FinalidadeCategoria.Despesa);
      carregarCategorias();
    } catch {
      setError("Erro ao cadastrar categoria");
    }
  };

  if (loading) return <p>Carregando categorias...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2>Categorias</h2>

      <div className="row mb-3">
        <div className="col-md-5">
          <input
            className="form-control"
            placeholder="Descrição"
            maxLength={400}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={finalidade}
            onChange={(e) =>
              setFinalidade(e.target.value as FinalidadeCategoria)
            }
          >
            <option value={FinalidadeCategoria.Despesa}>Despesa</option>
            <option value={FinalidadeCategoria.Receita}>Receita</option>
            <option value={FinalidadeCategoria.Ambas}>Ambas</option>
          </select>
        </div>

        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={handleCreate}>
            <i className="fa fa-plus"></i> Criar
          </button>
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Finalidade</th>
          </tr>
        </thead>
        <tbody>
          {categorias.length === 0 && (
            <tr>
              <td colSpan={3}>Nenhuma categoria cadastrada</td>
            </tr>
          )}
          {categorias.map((c) => (
            <tr key={c.categoriaId}>
              <td>{c.categoriaId}</td>
              <td>{c.descricao}</td>
              <td>{c.finalidade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
