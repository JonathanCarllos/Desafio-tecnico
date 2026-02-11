using Desafio_Api.DTO_s;

public interface IPessoaService
{
    Task<IEnumerable<PessoaDTO>> GetPessoa();
    Task<PessoaDTO?> GetPessoaById(int id);
    Task<PessoaDTO> AddPessoa(PessoaDTO pessoaDTO);
    Task Update(PessoaDTO pessoaDTO);
    Task RemovePessoa(int id);
}
