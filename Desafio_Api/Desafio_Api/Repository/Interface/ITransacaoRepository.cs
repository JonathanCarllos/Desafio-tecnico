using Desafio_Api.Models;

public interface ITransacaoRepository
{
    Task<IEnumerable<Transacao>> ListarAsync();
    Task<Transacao?> ObterPorIdAsync(int id);
    Task AdicionarAsync(Transacao transacao);
    Task SalvarAsync();
}
