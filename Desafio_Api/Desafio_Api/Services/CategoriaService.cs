using AutoMapper;
using Desafio_Api.DTO_s;
using Desafio_Api.Models;
using Desafio_Api.Repository.Interface;
using Desafio_Api.Services.Interface;

namespace Desafio_Api.Services
{
    // Service responsável por conter as regras de negócio relacionadas à entidade Categoria.
    public class CategoriaService : ICategoriaService
    {
        private readonly ICategoriaRepository _categoriaRepository;
        private readonly IMapper _mapper;

        public CategoriaService(ICategoriaRepository categoriaRepository, IMapper mapper)
        {
            _categoriaRepository = categoriaRepository;
            _mapper = mapper;
        }

        public async Task AddCategoria(CategoriaDTO categoriaDTO)
        {
            var categoriaEntity = _mapper.Map<Categoria>(categoriaDTO);
            await _categoriaRepository.Create(categoriaEntity);
            categoriaDTO.CategoriaId = categoriaEntity.CategoriaId;
        }

        public async Task<IEnumerable<CategoriaDTO>> GetCategoria()
        {
            var categoriaEntity = await _categoriaRepository.GetAll();
            return  _mapper.Map<IEnumerable<CategoriaDTO>>(categoriaEntity);
        }
    }
}
