using Desafio_Api.Models;

namespace Desafio_Api.Repository.Interface
{
    public interface ICategoriaRepository
    {
        Task<IEnumerable<Categoria>> GetAll();      
        Task<Categoria> Create(Categoria categoria);      
    }
}
