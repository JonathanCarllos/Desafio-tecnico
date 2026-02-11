using AutoMapper;
using Desafio_Api.DTO_s;
using Desafio_Api.Models;
using Desafio_Api.Repository.Interface;
using Desafio_Api.Services.Interface;

namespace Desafio_Api.Services
{
    // Service responsável por conter as regras de negócio relacionadas à entidade Pessoa.
    public class PessoaService : IPessoaService
    {
        private readonly IPessoaRepository _pessoaRepository;
        private readonly IMapper _mapper;

        public PessoaService(IPessoaRepository pessoaRepository, IMapper mapper)
        {
            _pessoaRepository = pessoaRepository;
            _mapper = mapper;
        }

        public async Task<PessoaDTO> AddPessoa(PessoaDTO pessoaDTO)
        {
            var pessoaEntity = _mapper.Map<Pessoa>(pessoaDTO);
            await _pessoaRepository.Create(pessoaEntity);

            return _mapper.Map<PessoaDTO>(pessoaEntity);
        }

        public async Task<IEnumerable<PessoaDTO>> GetPessoa()
        {
            var pessoas = await _pessoaRepository.GetAll();
            return _mapper.Map<IEnumerable<PessoaDTO>>(pessoas);
        }

        public async Task<PessoaDTO?> GetPessoaById(int id)
        {
            var pessoa = await _pessoaRepository.GetById(id);
            return pessoa == null ? null : _mapper.Map<PessoaDTO>(pessoa);
        }

        public async Task Update(PessoaDTO pessoaDTO)
        {
            var pessoaExistente = await _pessoaRepository.GetById(pessoaDTO.PessoaId);

            if (pessoaExistente == null)
                throw new KeyNotFoundException("Pessoa não encontrada");

            _mapper.Map(pessoaDTO, pessoaExistente);
            await _pessoaRepository.Update(pessoaExistente);
        }


        public async Task RemovePessoa(int id)
        {
            var pessoa = await _pessoaRepository.Delete(id);
            if (pessoa == null)
                throw new KeyNotFoundException("Pessoa não encontrada");
        }
      

    }
}
