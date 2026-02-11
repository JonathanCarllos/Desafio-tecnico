using AutoMapper;
using Desafio_Api.Models;

namespace Desafio_Api.DTO_s.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Pessoa, PessoaDTO>().ReverseMap();
            CreateMap<Categoria, CategoriaDTO>().ReverseMap();
            CreateMap<Transacao, TransacaoDTO>().ReverseMap();
        }
    }
}
