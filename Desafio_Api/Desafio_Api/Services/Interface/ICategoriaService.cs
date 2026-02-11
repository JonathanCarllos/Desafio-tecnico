using Desafio_Api.DTO_s;

namespace Desafio_Api.Services.Interface
{
    public interface ICategoriaService
    {
        Task<IEnumerable<CategoriaDTO>> GetCategoria();       
        Task AddCategoria(CategoriaDTO categoriaDTO);
    }
}
