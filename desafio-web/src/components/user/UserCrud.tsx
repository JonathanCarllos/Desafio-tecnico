import { useEffect, useState } from "react";
import api from "../../services/api";
import { Pessoa } from "../../types/Pessoa";
import "./UserCrud.css";

const initialForm: Pessoa = {
  pessoaId: 0,
  nome: "",
  idade: 0
};

export default function UserCrud() {
  const [usuarios, setUsuarios] = useState<Pessoa[]>([]);
  const [form, setForm] = useState<Pessoa>(initialForm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //  carregar lista
  const loadUsuarios = () => {
    setLoading(true);
    api
      .get<Pessoa[]>("/Pessoas")
      .then(res => setUsuarios(res.data))
      .catch(() => setError("Erro ao carregar usuários"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadUsuarios();
  }, []);

  //  submit (create / update)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const request = form.pessoaId
      ? api.put(`/Pessoas/${form.pessoaId}`, form)
      : api.post("/Pessoas", form);

    request.then(() => {
      setForm(initialForm);
      loadUsuarios();
    });
  };

  //  editar
  const handleEdit = (usuario: Pessoa) => {
    setForm(usuario);
  };

  //  deletar
  const handleDelete = (id: number) => {
    if (!window.confirm("Deseja realmente excluir?")) return;

    api.delete(`/Pessoas/${id}`).then(loadUsuarios);
  };

  if (loading) return <p>Carregando usuários...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="user-crud">
    
      <form className="mb-4" onSubmit={handleSubmit}>
        <h5>{form.pessoaId ? "Editar usuário" : "Novo usuário"}</h5>

        <div className="row">
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Nome"
              value={form.nome}
              onChange={e => setForm({ ...form, nome: e.target.value })}
              required
            />
          </div>

          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Idade"
              value={form.idade}
              onChange={e =>
                setForm({ ...form, idade: Number(e.target.value) })
              }
              required
            />
          </div>

          <div className="col-md-3 d-flex gap-2">
            <button className="btn btn-primary" type="submit">
              {form.pessoaId ? "Atualizar" : "Salvar"}
            </button>

            {form.pessoaId !== 0 && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setForm(initialForm)}
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      </form>
      
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Idade</th>
            <th style={{ width: 150 }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.pessoaId}>
              <td>{u.pessoaId}</td>
              <td>{u.nome}</td>
              <td>{u.idade}</td>
              <td className="actions">
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => handleEdit(u)}
                >
                  ✏️
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(u.pessoaId)}
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
