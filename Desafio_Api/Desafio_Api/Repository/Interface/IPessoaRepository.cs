using Desafio_Api.Models;

namespace Desafio_Api.Repository.Interface
{
    public interface IPessoaRepository
    {
        Task<IEnumerable<Pessoa>> GetAll();
        Task<Pessoa> GetById(int id);
        Task<Pessoa> Create(Pessoa pessoa);
        Task<Pessoa> Update(Pessoa pessoa);
        Task<Pessoa> Delete(int id);
    }
}
