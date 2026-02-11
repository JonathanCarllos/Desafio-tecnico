using Desafio_Api.Models;

namespace Desafio_Api.Services.Interface
{
    public interface ITransacaoService
    {
        Task<IEnumerable<Transacao>> ListarAsync();
        Task<Transacao> CriarAsync(Transacao transacao);
    }
}
