using Desafio_Api.Context;
using Desafio_Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Desafio_Api.Repository
{
    // Repository responsável por realizar operações de acesso ao banco de dados da entidade Transacao.

    public class TransacaoRepository : ITransacaoRepository
    {
        private readonly AppDbContext _context;

        public TransacaoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Transacao>> ListarAsync()
        {
            return await _context.Transacoes
                .Include(t => t.Pessoa)
                .Include(t => t.Categoria)
                .ToListAsync();
        }

        public async Task<Transacao?> ObterPorIdAsync(int id)
        {
            return await _context.Transacoes
                .Include(t => t.Pessoa)
                .Include(t => t.Categoria)
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task AdicionarAsync(Transacao transacao)
        {
            await _context.Transacoes.AddAsync(transacao);
        }

        public async Task SalvarAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}